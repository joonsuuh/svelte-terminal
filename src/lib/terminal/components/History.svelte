<script lang="ts">
	import { getHistory } from '../states/history.svelte';
	import { themeState } from '$lib/states/themeState.svelte';
	import Ps1 from './Ps1.svelte';

	let history = $derived(getHistory());
	let theme = $derived(themeState.current);
</script>

{#each history as { command, output }}
	<div style={`color: ${theme.foreground}`}>
		<div class="flex flex-col md:flex-row">
			<Ps1 />

			<div class="flex">
				<p class="visible md:hidden">❯</p>

				<p class="px-2">{command}</p>
			</div>
		</div>

		{#if output}
			<div class="terminal-output whitespace-pre">
				{@html output}
			</div>
		{/if}
	</div>
{/each}

<style>
	/* Style links within terminal output - using !important to override inline styles */
	.terminal-output :global(a) {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}
</style>
