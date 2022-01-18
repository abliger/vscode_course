import * as vscode from 'vscode';

export class rollup implements vscode.TreeDataProvider<Dependency> {
    getTreeItem(element: Dependency): Dependency | Thenable<Dependency> {
        return element
    }
    getChildren(element?: any): vscode.ProviderResult<Dependency[]> {
      let a=new Dependency("test", vscode.TreeItemCollapsibleState.None)
  
        return [a]
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