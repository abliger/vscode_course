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
    const rollupCourse1 = new Dependency('Rollup 演示文档', vscode.TreeItemCollapsibleState.None)
    rollupCourse1.command = {
      title: 'Rollup 演示文档',
      command: 'abliger.rollup_course.showRollup'
    }
    const rollupCourse2 = new Dependency('Rollup 实验', vscode.TreeItemCollapsibleState.None)
    rollupCourse2.command = {
      title: 'Rollup 实验',
      command: 'abliger.rollup_course.showRollupProject'
    }
    return [rollupCourse1, rollupCourse2]
  }
}
