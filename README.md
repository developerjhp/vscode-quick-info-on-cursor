# Quick Info on Cursor

A VS Code extension that automatically shows Quick Info (type information, documentation, etc.) when the keyboard cursor moves to a symbol.

## Features

- **Automatic hover on cursor movement** - No need to hover with mouse
- **Configurable delay** - Set custom delay before showing info (default: 500ms)
- **Easy toggle** - Enable/disable the extension anytime

## How it works

When you move your cursor to a symbol (variable, function, etc.), the extension automatically triggers VS Code's hover action after a configurable delay. This eliminates the need to manually hover with your mouse to see type information and documentation.

## Settings

This extension contributes the following settings:

- `quickInfoOnCursor.enabled`: Enable/disable the extension (default: `true`)
- `quickInfoOnCursor.delay`: Delay in milliseconds before showing Quick Info (default: `500`)

## Development

```bash
# Install dependencies
yarn install

# Compile
yarn compile

# Watch mode for development
yarn watch

# Lint
yarn lint
```

## Commands

- `Quick Info on Cursor: Trigger Hover for Debugging` - Manually trigger hover for debugging purposes

## License

MIT
