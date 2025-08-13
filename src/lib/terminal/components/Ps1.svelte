<script lang="ts">
	import { themeState } from '$lib/states/themeState.svelte';

	let hostname = $state('localhost');
	let theme = $derived(themeState.current);
</script>

<div class="flex">
	<span style={`color: ${theme.brightYellow};`}>guest</span>
	<span style={`color: ${theme.foreground}`}>@</span>
	<span style={`color: ${theme.brightGreen}`}>{hostname}</span>
	<span style={`color: ${theme.foreground}`}>:~$</span>
</div>
