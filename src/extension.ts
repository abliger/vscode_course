// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { readFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import * as vscode from 'vscode'
import { Controller, SampleSerializer } from './notebook'
import { rollup } from './rollup'
/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context: vscode.ExtensionContext, templatePath: string) {
  const resourcePath = join(context.extensionPath, templatePath)
  const dirPath = dirname(resourcePath)
  let html = readFileSync(resourcePath, 'utf-8')
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
    return $1 + vscode.Uri.file(resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"'
  })
  return html
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.registerNotebookSerializer('my-notebook', new SampleSerializer())
  );
  context.subscriptions.push(new Controller()._controller);
  vscode.window.registerTreeDataProvider(
    'package-dependencies',
    new rollup()
  );
  context.subscriptions.push(vscode.commands.registerCommand('aaa', () =>
    vscode.commands.executeCommand('workbench.action.openWalkthrough', 'undefined_publisher.rollup-course#rollup_learn')))
  let a = console.log(vscode.extensions.getExtension('undefined_publisher.rollup-course'));
  console.log(a);

}

// this method is called when your extension is deactivated
export function deactivate() {
  // todo
}
