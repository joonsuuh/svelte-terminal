<script lang="ts">
	import { onMount } from 'svelte';
	import * as history from '../states/history.svelte';
	import { executeCommand, getCompletions, applyTabCompletion } from '../utils/commands';

	let currentCommand = $state('');
	let commandInput = $state<HTMLInputElement>();

	onMount(async () => {
		const output = await executeCommand('banner');
		history.addCommand('banner');
		history.updateLastCommandOutput(output);
	});

	async function sendCommand() {
		try {
			const output = await executeCommand(currentCommand);
			history.addCommand(currentCommand);
			history.updateLastCommandOutput(output);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			history.addCommand(currentCommand);
			history.updateLastCommandOutput(`Error: ${errorMessage}`);
		}

		currentCommand = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			sendCommand();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			const previousCommand = history.getPreviousCommand();
			if (previousCommand) {
				currentCommand = previousCommand;
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			const nextCommand = history.getNextCommand();
			if (nextCommand) {
				currentCommand = nextCommand;
			} else {
				currentCommand = '';
			}
		} else if (event.key === 'Tab') {
			event.preventDefault();

			const completions = getCompletions(currentCommand);
			const result = applyTabCompletion(currentCommand, completions);

			currentCommand = result.newInput;
		} else if (event.ctrlKey && event.key === 'l') {
			event.preventDefault();
			history.clearHistory();
			currentCommand = '';
		}
	}

	// Auto-focus input
	$effect(() => {
		if (commandInput) {
			commandInput.focus();
		}
	});

	// Auto-scroll to bottom when history changes
	$effect(() => {
		if (history.getHistoryLength() > 0) {
			setTimeout(() => {
				commandInput?.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}, 10);
		}
	});
</script>

<svelte:window
	onclick={() => {
		commandInput?.focus();
	}}
/>

<div class="flex w-full">
	<p class="visible md:hidden">❯</p>
	<input
		bind:this={commandInput}
		bind:value={currentCommand}
		onkeydown={handleKeydown}
		class="w-full border-none bg-transparent px-2 outline-none"
		placeholder=""
		name="command-input"
	/>
</div>
