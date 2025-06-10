import * as vscode from "vscode";

let hoverTimer: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
  const selectionChangeDisposable =
    vscode.window.onDidChangeTextEditorSelection(
      (event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.kind !== vscode.TextEditorSelectionChangeKind.Keyboard) {
          return;
        }

        if (!vscode.window.activeTextEditor) {
          return;
        }

        const config = vscode.workspace.getConfiguration("quickInfoOnCursor");
        if (!config.get("enabled", true)) {
          return;
        }

        if (hoverTimer) {
          clearTimeout(hoverTimer);
        }

        const delay = config.get("delay", 500);

        hoverTimer = setTimeout(() => {
          vscode.commands.executeCommand("editor.action.showHover");
        }, delay);
      }
    );

  context.subscriptions.push(selectionChangeDisposable);
}

export function deactivate() {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
}
