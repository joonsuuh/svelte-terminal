<script lang="ts">
	import { getHistory } from '../states/history.svelte';
	import Ps1 from './Ps1.svelte';

	let history = $derived(getHistory());
</script>

{#each history as { command, output }, index (index)}
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
{/each}

<style>
	.terminal-output :global(a) {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}

	.terminal-output {
		line-height: normal;
	}
</style>
