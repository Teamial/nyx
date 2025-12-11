import { measurePerformance } from '$lib/utils/performance';
import { getKV, setKV, isCacheStale } from '$lib/utils/edge-cache';
import type { KVNamespace } from '@cloudflare/workers-types';
export interface CommitLanguage {
	size: number;
	name: string;
	color: string;
}

export interface V2CommitItem {
	repo: string;
	additions: number;
	deletions: number;
	commitUrl: string;
	committedDate: string;
	oid: string;
	messageHeadline: string;
	messageBody: string;
}

export interface KatibV2Response {
	commits: V2CommitItem[];
	languages: CommitLanguage[];
	stats: { totalAdditions: number; totalDeletions: number; totalCommits: number };
}

export interface ProcessedCommit {
	repo: string;
	message: string;
	href: string;
	sha: string;
	date: string;
	additions?: number;
	deletions?: number;
}

export interface CommitData {
	commits: ProcessedCommit[];
	languages: CommitLanguage[];
	totalAdditions: number;
	totalDeletions: number;
	totalCommits: number;
}

const KV_KEY = 'github:commits';
const TTL_MS = 60 * 60 * 1000; // 1 hour
const GITHUB_USERNAME = 'teamial';

// Fallback data (empty) if GitHub is unreachable or rate-limited
const FALLBACK_COMMIT_DATA: CommitData = {
	commits: [],
	languages: [],
	totalAdditions: 0,
	totalDeletions: 0,
	totalCommits: 0
};

function processResponse(data: KatibV2Response): CommitData {
	const commits: ProcessedCommit[] = (data.commits || []).map((c) => ({
		repo: c.repo,
		message: c.messageHeadline,
		href: c.commitUrl,
		sha: c.oid,
		date: c.committedDate,
		additions: c.additions,
		deletions: c.deletions
	}));

	const totalAdditions =
		data.stats?.totalAdditions ?? commits.reduce((acc, c) => acc + (c.additions || 0), 0);
	const totalDeletions =
		data.stats?.totalDeletions ?? commits.reduce((acc, c) => acc + (c.deletions || 0), 0);
	const totalCommits = data.stats?.totalCommits ?? commits.length;

	return {
		commits,
		languages: data.languages || [],
		totalAdditions,
		totalDeletions,
		totalCommits
	};
}

/**
 * Fetches recent commits from GitHub public events with KV cache (stale-while-revalidate).
 * Note: GitHub unauthenticated requests are rate-limited; consider adding a token if needed.
 */
export async function fetchLatestCommits(kv?: KVNamespace): Promise<CommitData> {
	// If KV available, try cache-first approach
	if (kv) {
		const cached = await getKV<CommitData>(kv, KV_KEY);
		if (cached) {
			// Check if stale before refreshing
			if (isCacheStale(cached, TTL_MS)) {
				console.log('[PERF] fetchLatestCommits: Cache stale, refreshing in background');
				void refreshCache(kv);
			} else {
				console.log('[PERF] fetchLatestCommits: Cache fresh, using cached data');
			}
			return cached.data;
		}
	}

	// No KV or no cache - fetch directly
	console.log('[PERF] fetchLatestCommits: NO CACHE - fetching from GitHub...');
	return await refreshCache(kv);
}

async function refreshCache(kv?: KVNamespace): Promise<CommitData> {
	return await measurePerformance('github-api-fetch', async () => {
		try {
			const response = await fetch(
				`https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
				{
					headers: {
						Accept: 'application/vnd.github+json',
						'User-Agent': 'nyx-website/1.0'
					},
					signal: AbortSignal.timeout(1200)
				}
			);

			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const events: Array<{
				type: string;
				repo?: { name?: string };
				payload?: { commits?: Array<{ sha: string; message: string }> };
				created_at?: string;
			}> = await response.json();

			const seen = new Set<string>();
			const commits: ProcessedCommit[] = [];

			for (const ev of events) {
				if (ev.type !== 'PushEvent') continue;
				const repoName = ev.repo?.name;
				const date = ev.created_at || new Date().toISOString();
				for (const c of ev.payload?.commits || []) {
					if (!repoName || !c?.sha || seen.has(c.sha)) continue;
					seen.add(c.sha);
					commits.push({
						repo: repoName,
						message: c.message,
						href: `https://github.com/${repoName}/commit/${c.sha}`,
						sha: c.sha.substring(0, 7),
						date
					});
					if (commits.length >= 5) break;
				}
				if (commits.length >= 5) break;
			}

			const data: CommitData = {
				commits,
				languages: [],
				totalAdditions: 0,
				totalDeletions: 0,
				totalCommits: commits.length
			};

			if (kv) await setKV(kv, KV_KEY, data);
			return data;
		} catch (err) {
			console.warn('github fetch failed:', err);
			// Try KV cache if available
			if (kv) {
				const cached = await getKV<CommitData>(kv, KV_KEY);
				if (cached) {
					console.log('Using stale KV cache after fetch failure');
					return cached.data;
				}
			}
			console.log('Using fallback data after fetch failure');
			return FALLBACK_COMMIT_DATA;
		}
	});
}
