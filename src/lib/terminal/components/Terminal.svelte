<script lang="ts">
	import Ps1 from './Ps1.svelte';
	import Input from './Input.svelte';
	import History from './History.svelte';
</script>

<main class="h-screen w-screen overflow-auto rounded-md border-2 p-4 text-xs sm:text-sm md:text-lg">
	<History />

	<div class="flex flex-col md:flex-row">
		<div class="flex-shrink-0">
			<Ps1 />
		</div>
		<Input />
	</div>
</main>
