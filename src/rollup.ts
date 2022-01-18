import * as vscode from 'vscode'

class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState)
    this.tooltip = `${this.label}`
  }
}

export class Rollup implements vscode.TreeDataProvider<Dependency> {
  getTreeItem(element: Dependency): Dependency | Thenable<Dependency> {
    return element
  }

  getChildren(): vscode.ProviderResult<Dependency[]> {
    const rollupCourse = new Dependency('Rollup 演示文档', vscode.TreeItemCollapsibleState.None)
    rollupCourse.command = {
      title: 'Rollup 演示文档',
      command: 'site.abliger.rollup_course.showRollup'
    }
    return [rollupCourse]
  }
}
