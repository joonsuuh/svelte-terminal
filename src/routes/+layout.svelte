<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeState } from '$lib/states/themeState.svelte';

	let { children } = $props();
	let currentTheme = $derived(themeState.current);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="min-h-screen transition-colors"
	style="
		--bg-color: {currentTheme.background};
		--fg-color: {currentTheme.foreground};
		--red-color: {currentTheme.red};
		--green-color: {currentTheme.green};
		--yellow-color: {currentTheme.yellow};
		--blue-color: {currentTheme.blue};
		--purple-color: {currentTheme.purple};
		--cyan-color: {currentTheme.cyan};
		--white-color: {currentTheme.white};
		--black-color: {currentTheme.black};
		--bright-red-color: {currentTheme.brightRed};
		--bright-green-color: {currentTheme.brightGreen};
		--bright-yellow-color: {currentTheme.brightYellow};
		--bright-blue-color: {currentTheme.brightBlue};
		--bright-purple-color: {currentTheme.brightPurple};
		--bright-cyan-color: {currentTheme.brightCyan};
		--bright-white-color: {currentTheme.brightWhite};
		--bright-black-color: {currentTheme.brightBlack};
		background-color: {currentTheme.background};
		color: {currentTheme.foreground};
		font-family: 'ComicShannsMono Nerd Font', monospace;
	"
>
	{@render children?.()}
</div>
