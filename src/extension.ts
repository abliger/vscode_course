// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { Rollup } from './rollup'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider(
    'abliger.courseHelp',
    new Rollup()
  )
  context.subscriptions.push(vscode.commands.registerCommand('abliger.rollup_course.showRollup', () =>
    vscode.commands.executeCommand('workbench.action.openWalkthrough', 'abliger.rollup-course#rollup_learn')))

  context.subscriptions.push(vscode.commands.registerCommand('abliger.rollup_course.pullProjectApp', async () => {
    const uri = {
      gitee: 'https://github.com.cnpmjs.org/rollup/rollup-starter-app',
      github: 'https://github.com/rollup/rollup-starter-app.git'
    } as { [key: string]: string }
    const remoteGit = await vscode.window.showQuickPick(Object.keys(uri))
    if (!remoteGit) {
      return
    }
    vscode.commands.executeCommand('git.clone', uri[remoteGit])
  }))
  context.subscriptions.push(vscode.commands.registerCommand('abliger.rollup_course.pullProjectLib', async () => {
    const uri = {
      gitee: 'https://github.com.cnpmjs.org/rollup/rollup-starter-lib',
      github: 'https://github.com/rollup/rollup-starter-lib.git'
    } as { [key: string]: string }
    const remoteGit = await vscode.window.showQuickPick(Object.keys(uri))
    if (!remoteGit) {
      return
    }
    vscode.commands.executeCommand('git.clone', uri[remoteGit])
  }))
  context.subscriptions.push(vscode.commands.registerCommand('abliger.rollup_course.pullProjectVue', async () => {
    const uri = {
      gitee: 'https://github.com.cnpmjs.org/abliger/rollup-plugin-vue-test',
      github: 'https://github.com/abliger/rollup-plugin-vue-test.git',
    } as { [key: string]: string }
    const remoteGit = await vscode.window.showQuickPick(Object.keys(uri))
    if (!remoteGit) {
      return
    }
    vscode.commands.executeCommand('git.clone', uri[remoteGit])
  }))
}

// this method is called when your extension is deactivated
export function deactivate() {
  // todo
}
