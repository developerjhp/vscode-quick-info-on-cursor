import * as vscode from "vscode";

let hoverTimer: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
  checkAndSuggestGitLensSetting();

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

        deactivate();

        const delay = config.get("delay", 500);

        hoverTimer = setTimeout(() => {
          vscode.commands.executeCommand("editor.action.showHover");
        }, delay);
      }
    );

  context.subscriptions.push(selectionChangeDisposable);
}

/**
 * Check GitLens Current Line Hover settings and suggest changing
 * from 'line' to 'annotation' if currently set to 'line'
 */
async function checkAndSuggestGitLensSetting() {
  const gitlens = vscode.extensions.getExtension("eamodio.gitlens");
  if (!gitlens) {
    return;
  }

  const config = vscode.workspace.getConfiguration(
    "gitlens.hovers.currentLine"
  );
  const currentSetting = config.get<string>("over");

  if (currentSetting === "line") {
    const selection = await vscode.window.showInformationMessage(
      "For a better experience with 'Quick Info on Cursor', we recommend changing the GitLens hover setting ('currentLine.over') from 'line' to 'annotation'. This will prevent GitLens info from conflicting with type info.",
      "Change to 'annotation'",
      "Later"
    );

    if (selection === "Change to 'annotation'") {
      await config.update(
        "over",
        "annotation",
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage(
        "GitLens hover setting changed to 'annotation'."
      );
    }
  }
}

export function deactivate() {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
}
