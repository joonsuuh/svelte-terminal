export interface Command {
	command: string;
	output: string;
}

// --- Commands interfaces ---
export interface CommandDef {
	execute: (args: string[]) => Promise<string> | string;
	description?: string;
	usage?: string;
	examples?: string[];
	completions?: CompletionDef;
}

export interface CompletionDef {
	options?: string[]; // possible completions
	subcommands?: Record<string, CompletionDef>; // infinite subcommands?
}
