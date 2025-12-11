<script lang="ts">
	import {
		IconBrandGithub,
		IconBrandLinkedin,
		IconMail,
		IconBriefcase,
		IconSchool
	} from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
</script>

<svelte:head>
	<title>About | {Site.name}</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
	<!-- About Me Section -->
	<section class="space-y-6">
		<h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl">
			<span>About</span>
		</h1>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="md:col-span-1">
				<img
					src="/images/avatar.webp"
					alt={Site.name}
					class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
				/>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					<b>Hi!</b> I’m Teanna Cole — a Computer Science student at Lehman College (CUNY), concentrating
					in Software Engineering &amp; Artificial Intelligence.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					My work spans backend development, ML engineering, and building products end-to-end. I’ve
					interned at the National Science Foundation (NSF) and Morgan Stanley, and I’m always
					looking for opportunities to learn, ship, and collaborate.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					If you’d like to connect, feel free to reach out via email or LinkedIn.
				</p>

				<div class="flex flex-wrap gap-3 pt-2">
					<a
						href={Site.out.github}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandGithub size={16} />
						GitHub
					</a>

					<span class="text-surface1">*</span>

					<a
						href={Site.out.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandLinkedin size={16} />
						LinkedIn
					</a>

					<span class="text-surface1">*</span>
					<a
						href={`mailto:${Site.out.email}`}
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconMail size={16} />
						{Site.out.email}
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
