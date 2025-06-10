import * as vscode from "vscode";

let hoverTimer: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
  checkAndPromptForAccessibilitySetting();

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

async function checkAndPromptForAccessibilitySetting() {
  const config = vscode.workspace.getConfiguration("editor");
  const currentSetting = config.get("accessibilitySupport");

  if (currentSetting !== "on") {
    const selection = await vscode.window.showInformationMessage(
      "To use the auto-focus feature of 'Quick Info on Cursor', the 'editor.accessibilitySupport' setting must be set to 'on'. Would you like to set it now?",
      "Enable",
      "No"
    );

    if (selection === "Enable") {
      await config.update(
        "accessibilitySupport",
        "on",
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage(
        "‘Accessibility Support’ is set to ‘on’."
      );
    }
  }
}

export function deactivate() {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
}
