<script lang="ts">
	import Ps1 from './Ps1.svelte';
	import Input from './Input.svelte';
	import History from './History.svelte';
	import { themeState } from '$lib/states/themeState.svelte';

	let theme = $derived(themeState.current);
</script>

<main
	class="h-screen w-screen overflow-auto rounded-md border-2 p-4 text-xs sm:text-sm md:text-lg"
	style={`background-color: ${theme.background}; color: ${theme.foreground}; border-color: ${theme.white}; scroll-behavior: smooth;`}
>
	<History />

	<div class="flex flex-col md:flex-row">
		<Ps1 />
		<Input />
	</div>
</main>
