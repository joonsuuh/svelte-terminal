<script lang="ts">
	import { themeState } from '$lib/states/theme.svelte';
	import { onMount } from 'svelte';

	let hostname = $state('localhost');
	let theme = $derived(themeState.current);

	onMount(() => {
		hostname = window.location.hostname;
	});
</script>

<div class="flex">
	<span style={`color: ${theme.brightYellow}`}>guest</span>
	<span style={`color: ${theme.foreground}`}>@</span>
	<span style={`color: ${theme.brightGreen}`}>{hostname}</span>
	<span style={`color: ${theme.foreground}`}>:~$</span>
</div>
