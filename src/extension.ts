// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { rollup } from './rollup'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider(
    'package-dependencies',
    new rollup()
  );
  context.subscriptions.push(vscode.commands.registerCommand('site.abliger.rollup_course.showRollup', () =>
    vscode.commands.executeCommand('workbench.action.openWalkthrough', 'site.abliger.rollup-course#rollup_learn')))

}

// this method is called when your extension is deactivated
export function deactivate() {
  // todo
}
