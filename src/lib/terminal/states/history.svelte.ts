import type { Command } from '../types/command';

let commandHistory = $state<Command[]>([]);
let commandIdx = $state<number>(0);

export function addCommand(command: string): void {
	// if (!command.trim()) return;

	const historyEntry: Command = {
		command: command,
		output: ''
	};

	commandHistory = [...commandHistory, historyEntry];
	commandIdx = commandHistory.length;
}

export function updateLastCommandOutput(output: string): void {
	if (commandHistory.length > 0) {
		const lastEntry = commandHistory[commandHistory.length - 1];

		lastEntry.output = output;
		commandHistory = [...commandHistory];
	}
}

export function clearHistory(): void {
	commandHistory = [];
	commandIdx = 0;
}

export function getHistory(): Command[] {
	return commandHistory;
}

export function getHistoryLength(): number {
	return commandHistory.length;
}

// Navigation commands
export function getPreviousCommand(): string {
	if (commandHistory.length === 0) {
		return '';
	}
	commandIdx--;
	if (commandIdx < 0) {
		commandIdx = 0;
	}
	return commandHistory[commandIdx].command;
}

export function getNextCommand(): string {
	if (commandIdx + 1 >= commandHistory.length) {
		return '';
	}
	commandIdx++;
	return commandHistory[commandIdx].command;
}
