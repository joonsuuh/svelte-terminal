import { themeState } from '$lib/states/themeState.svelte';
import * as history from '$lib/terminal/states/history.svelte';

// --- Helper functions ---
function commandUsage(command: string): string {
	const commandDef = commandDefinitions[command];
	const man =
`Usage:
  ${commandDef.usage}
${'Examples:\n  ' + commandDef.examples?.map(ex => `${ex}`).join('\n  ') || 'No examples available.'}`;
	return man;
}

function helpMessage(): string {
	return `Command not found.\n Type'help' to see all available commands.`;
}

function link(url: string, text: string): string {
	return `<a style="color: var(--fg-color)" href="${url}" target="_blank">${text}</a>`;
}

function span(text: string): string {
	return `<span style="color: var(--fg-color)">${text}</span>`;
}

function color16(colorName: string): string {
	return `<span style="background-color: var(--${colorName}-color); color: var(--${colorName}-color);">███</span>`;
}

function getCurrentAge(birthDate: Date): string {
	const now = new Date();
	const ageInMilliseconds = now.getTime() - birthDate.getTime();
	const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.2422); // tropical years
	return ageInYears.toFixed(9);
}

// --- Live age counter thingy ---
const activeIntervals = new Set<number>();

function getLiveAge(birthDate: Date): string {
	const ageId = `age-${Date.now()}`; // Unique ID for each fetch call
	const initialAge = getCurrentAge(birthDate);

	// Give the DOM some time
	setTimeout(() => {
		const ageElement = document.getElementById(ageId);
		if (ageElement) {
			const updateAge = () => {
				// Check if element still exists in DOM
				if (!document.getElementById(ageId)) {
					clearInterval(interval);
					activeIntervals.delete(interval);
					return;
				}
				ageElement.textContent = getCurrentAge(birthDate);
			};

			// Solid 10fps 
			const interval = setInterval(updateAge, 100);
			activeIntervals.add(interval);
		}
	}, 50);

	return `<span id="${ageId}" style="color: var(--fg-color)">${initialAge}</span>`;
}

// Cleanup function to clear all age intervals (call when history is cleared)
function clearAllAgeIntervals(): void {
	activeIntervals.forEach((interval) => clearInterval(interval));
	activeIntervals.clear();
}

const BIRTH_DATE = new Date('2002-01-10'); // Replace with your birth date

// --- Commands interfaces ---
interface CommandDef {
	execute: (args: string[]) => Promise<string> | string;
	description?: string;
	usage?: string;
	examples?: string[];
	completions?: CompletionDef;
}

interface CompletionDef {
	options?: string[]; // possible completions
	subcommands?: Record<string, CompletionDef>; // infinite subcommands?
}

// -----------------------------
// --- Add new commands here ---
// -----------------------------
const commandDefinitions: Record<string, CommandDef> = {
	banner: {
		execute: () => `
     ██╗ ██████╗  ██████╗ ███╗   ██╗███████╗██╗   ██╗██╗   ██╗██╗  ██╗
     ██║██╔═══██╗██╔═══██╗████╗  ██║██╔════╝██║   ██║██║   ██║██║  ██║
     ██║██║   ██║██║   ██║██╔██╗ ██║███████╗██║   ██║██║   ██║███████║
██   ██║██║   ██║██║   ██║██║╚██╗██║╚════██║██║   ██║██║   ██║██╔══██║
╚█████╔╝╚██████╔╝╚██████╔╝██║ ╚████║███████║╚██████╔╝╚██████╔╝██║  ██║
 ╚════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝.dev

Type 'help' to see a list of commands.
Type 'fetch' to see more info.`,
		description: 'Display ASCII art banner'
	},

	fetch: {
		execute: () => {
			const standardColors = ['black', 'red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'white'];
			const brightColors = standardColors.map((color) => `bright-${color}`);

			const frameworks = [
				{ url: 'https://svelte.dev/', name: 'SvelteKit' },
				{ url: 'https://tailwindcss.com/', name: 'Tailwind CSS' },
				{ url: 'https://www.typescriptlang.org/', name: 'TypeScript' }
			];
			const frameworkLinks = frameworks.map((f) => link(f.url, f.name)).join(' / ');

			const OS = ['Fedora Linux 41', 'macOS', 'Windows'];
			const OSList = OS.map((os) => span(os)).join(' / ');

			return `<div style="color: var(--bright-red-color)">
              ++++++++++++     		joonsuuh@earth 
           ++++++++++++++++++  		--------------
        ++++++++++     ++++++++ 	Framework: ${frameworkLinks}
     +++++++++            ++++++	Theme: ${span(themeState.current.name)}
   +++++++++               +++++	Font: ${span('Inter')}
 ++++++++         +++++     ++++	Terminal Font: ${span('ComicShannsMono Nerd Font')}
++++++         ++++++++++  +++++	--------------
+++++      +++++++++++++++++++++	OS: ${OSList}
+++++     ++++++        +++++++ 	Terminal: ${link('https://sw.kovidgoyal.net/kitty/', 'kitty')}
+++++      ++             +++++ 	Editor: ${link('https://neovim.io/', 'Neovim')}
 +++++             ++      +++++	Browser: ${link('https://zen-browser.app/', 'Zen Browser')}
 +++++++        ++++++     +++++	--------------
+++++++++++++++++++++      +++++	Github: ${link('https://github.com/joonsuuh', 'github.com/joonsuuh')}
+++++  +++++++++++        ++++++	Contact: ${span('username [at] gmail [dot] com')}
++++     +++++         ++++++++ 	Uptime: ${getLiveAge(BIRTH_DATE)} ${span('years')}
+++++               +++++++++   	
++++++            +++++++++     	${standardColors.map((color) => color16(color)).join('')}
 ++++++++     ++++++++++        	${brightColors.map((color) => color16(color)).join('')}
   ++++++++++++++++++           
      ++++++++++++              
	</div>`;
		},
		description: 'Display system information'
	},

	help: {
		execute: (args: string[]) => {
			if (args.length > 0) {
				return helpMessage();
			}

			// Show general help
			return `Available commands:\n${Object.entries(commandDefinitions)
				.map(([name, def]) => {
					return def.description ? `  ${name.padEnd(20)} - ${def.description}` : `  ${name}`;
				})
				.join('\n')}`;
		},
		description: 'Show this help message',
	},

	clear: {
		execute: () => {
			history.clearHistory();
			clearAllAgeIntervals(); // Clean up all age counters
			return '';
		},
		description: 'Clears terminal'
	},

	theme: {
		execute: (args: string[]) => {
			if (args.length === 0) {
				return commandUsage('theme');
			}

			switch (args[0]) {
				case 'list':
				case 'ls':
					return listThemes();
				case 'set':
					return setTheme(args[1]);
				case 'next':
					return nextTheme();
				case 'current':
				case 'which':
					return getCurrentTheme();
				case 'random':
					return getRandomTheme();
				case '--help':
				case '-h':
				case 'help':
					return commandUsage('theme');
				default:
					return `Unknown theme command: ${args[0]}\nType 'theme --help' for usage.`;;
			}
		},
		description: 'Manage terminal themes',
		usage: 'theme [list|set|next|current|random|help]',
		examples: ['theme list', 'theme set catppuccin-mocha', 'theme next'],
		completions: {
			subcommands: {
				list: {},
				ls: {},
				set: {
					options: themeState.all.map(theme => theme.name)
				},
				next: {},
				current: {},
				which: {},
				random: {},
				help: {}
			}
		}
	},

	// --- API commands ---
	github: {
		execute: async () => {
			window.open('https://github.com/joonsuuh', '_blank');

			return 'Opening repo...';
		},
		description: `Go to my GitHub page`,
	},
	weather: {
		execute: async (args: string[]) => {
			const city = args.join('+');
			if (!city) {
				return 'Usage: weather [city]. Example: weather Brussels';
			}

			if (args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
				return commandUsage('weather');
			}

			const weather = await fetch(`https://wttr.in/${city}?Tu`);
			const text = await weather.text();
			
			// Trim lines because ?A doesn't work with current font
			const lines = text.split('\n');
			const trimmedLines = lines.slice(297, -13); // remove html/css stuff
			
			return trimmedLines.join('\n');
		},
		description: 'Fetch current weather for a city',
		usage: 'weather [city]',
		examples: ['weather nyc', 'weather sf'],
	},

	// The Eternal Cycle of Editors
	vi: {
		execute: () => `Command not found: 'vi'. Did you mean 'vim'? 
(Use an IMPROVED version that actually works)`,
		description: `For the <a
		href="https://en.wikipedia.org/wiki/Bill_Joy" class="terminal-output" target="_blank"
		>Joy</a> of Programming`
	},

	vim: {
		execute: () => `Command not found: 'vim'. Real developers use 'nvim'.
(It has Lua, and who doesn't love Lua?)`,
		description: 'Vi IMproved (but not improved enough)'
	},

	nvim: {
		execute: () => `Command not found: 'nvim'. Too unstable; use 'emacs' instead.
(The terminal can't do everything, you know)`,
		description: 'Vim but with more configuration anxiety'
	},

	emacs: {
		execute: () => `Command not found: 'emacs'. Some how we lost the plot... just use 'code' i.e. vscode.
(It actually works out of the box)`,
		description: 'Almost an OS, but lacks an editor'
	},

	code: {
		execute: () => `Command not found: 'code'. Electron? Really? Might as well use 'vi'.
(Do we really need more javascript in our lives?)`,
		description: 'Basically a web browser pretending to be an editor'
	},

	nano: {
		execute: () => `Command not found: 'nano'. I can't really help you here...`,
		description: 'An editor for peaceful souls'
	},

	'how-to-exit-vim': {
		execute: () => `Step 1: Panic
Step 2: Press Esc
Step 3: Type 'ZZ' because you're sleepy
Step 4: Go to sleep`,
		description: `A four-step guide to escaping Vim`
	}
};

// Map all command names to their execute functions
const commands: Record<string, (args: string[]) => Promise<string> | string> = Object.fromEntries(
	Object.entries(commandDefinitions).map(([name, def]) => [name, def.execute])
);

export async function executeCommand(cmd: string): Promise<string> {
	const trimmedCmd = cmd.trim();

	if (!trimmedCmd) {
		return '';
	}

	const parts = trimmedCmd.split(/\s+/);
	const mainCommand = parts[0].toLowerCase();
	const args = parts.slice(1);

	const commandFn = commands[mainCommand];
	if (commandFn) {
		const result = commandFn(args);
		return result instanceof Promise ? await result : result;
	}

	return `Command not found: ${mainCommand}\nType "help" for available commands.`;
}

// --- Tab completion stuff ---
export function getCompletions(input: string): string[] {
	if (!input.trim()) return [];

	const parts = input.trim().split(' ');
	const [command, ...args] = parts.map(part => part.toLowerCase());

	// Complete main commands
	if (parts.length === 1) {
		return Object.keys(commandDefinitions).filter(cmd => cmd.startsWith(command));
	}

	// Complete subcommands and options
	const commandDef = commandDefinitions[command];
	if (!commandDef?.completions) return [];

	// Navigate to the appropriate completion level
	let completion = commandDef.completions;
	const completedArgs = args.slice(0, -1);
	
	for (const arg of completedArgs) {
		if (!completion.subcommands?.[arg]) return [];
		completion = completion.subcommands[arg];
	}

	// Get all available options at this level
	const allOptions = [
		...(completion.options || []),
		...(completion.subcommands ? Object.keys(completion.subcommands) : [])
	];

	// Filter by partial input and return full commands
	const partialInput = args[args.length - 1] || '';
	return allOptions
		.filter(option => option.toLowerCase().startsWith(partialInput))
		.map(option => [command, ...completedArgs, option].join(' '));
}

export function applyTabCompletion(input: string, completions: string[]): { newInput: string } {
	if (completions.length === 0) {
		return { newInput: input.trim() + ' ' };
	}
	
	if (completions.length === 1) {
		return { newInput: completions[0] + ' ' };
	}
	
	// Find common prefix for multiple completions
	const commonPrefix = completions.reduce((prefix, completion) => {
		let i = 0;
		while (i < prefix.length && i < completion.length && prefix[i] === completion[i]) {
			i++;
		}
		return prefix.slice(0, i);
	});

	return { newInput: commonPrefix };
}

// --- Theme help and management ---
function listThemes(): string {
	const themes = themeState.all.map((theme) => `  ${theme.name}`);
	return `Available themes:\n${themes.join('\n')}`;
}

function setTheme(themeName?: string): string {
	if (!themeName) {
		return 'Usage: theme set <theme-name>\nUse "theme list" to see available themes.';
	}

	return themeState.set(themeName)
		? ''
		: `Theme not found: ${themeName}\nUse "theme list" to see available themes.`;
}

function nextTheme(): string {
	themeState.next();
	return `Switched to ${themeState.current.name}`;
}

function getCurrentTheme(): string {
	const current = themeState.current;
	return `Current theme: ${current.name}`;
}

function getRandomTheme(): string {
	const success = themeState.randomTheme();
	return success ? `Switched to random theme: ${themeState.current.name}` : 'No themes available.';
}
