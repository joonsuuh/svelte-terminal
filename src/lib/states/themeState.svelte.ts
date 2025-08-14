import themes from '../assets/themes.json';
import type { Theme } from '../types/theme';

let currentThemeName = $state('catppuccin-frappe');

export const themeState = {
	get current(): Theme {
		const theme = themes.find((t) => t.name === currentThemeName);
		return theme || themes[0];
	},

	get all(): Theme[] {
		return themes;
	},

	set(themeName: string): boolean {
		const themeExists = themes.some((t) => t.name === themeName);
		if (!themeExists) {
			return false;
		}
		currentThemeName = themeName;
		localStorage.setItem('theme', themeName);
		return true;
	},

	next(): boolean {
		const current = this.current;
		const idx = themes.findIndex((t) => t.name === current.name);
		const next = themes[(idx + 1) % themes.length];
		return this.set(next.name);
	},

	randomTheme(): boolean {
		const randomIndex = Math.floor(Math.random() * themes.length);
		const randomTheme = themes[randomIndex];
		return this.set(randomTheme.name);
	}
};
