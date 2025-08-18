# Themes

Just yoink the windows-terminal `json` for a particular theme (e.g.
[catpuccin](https://github.com/catppuccin/windows-terminal)) into `src/lib/themes.json`.



## Notes

- `banner` uses [ANSI Shadow](https://www.asciiart.eu/text-to-ascii-art).

### How to subset a font 101

- Setup Python venv...
- Install `fonttools` and `brotli` packages.
- Subset fonts with `pyftsubset` (e.g., [fonterize.sh](./fonterize.sh)).