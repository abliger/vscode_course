// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {join,dirname,resolve} from 'path'; 
import {readFileSync} from 'fs';
/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
 function getWebViewContent(context: vscode.ExtensionContext, templatePath:string) { 
	const resourcePath = join(context.extensionPath, templatePath);
	const dirPath = dirname(resourcePath);
	let html = readFileSync(resourcePath, 'utf-8');
	// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
	html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
		return $1 + vscode.Uri.file(resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});
	return html; 
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	context.subscriptions.push(vscode.commands.registerCommand('rollup-course.rollupWelcome', function (uri) {
		const panel = vscode.window.createWebviewPanel(
			'rollupWelcome', // viewType
			"Rollup 学习", // 视图标题
			vscode.ViewColumn.One, // 显示在编辑器的哪个部位
			{
				enableScripts: true, // 启用JS，默认禁用
			}
		);
		panel.webview.html = getWebViewContent(context, 'public/rollup/custom-welcome.html');
		panel.webview.onDidReceiveMessage(message => {
			console.log(message);
		}, undefined, context.subscriptions);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
