import * as vscode from 'vscode';

export class rollup implements vscode.TreeDataProvider<Dependency> {
  getTreeItem(element: Dependency): Dependency | Thenable<Dependency> {
    return element
  }
  getChildren(element?: any): vscode.ProviderResult<Dependency[]> {
    let rollup_course = new Dependency("Rollup 演示文档", vscode.TreeItemCollapsibleState.None)
    rollup_course.command = {
      title: 'Rollup 演示文档',
      command: 'site.abliger.rollup_course.showRollup'
    }
    return [rollup_course]
  }
}

class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
  }
}