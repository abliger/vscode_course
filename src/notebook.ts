import * as vscode from 'vscode'
import { TextDecoder, TextEncoder } from 'util';
import {exec} from 'shelljs'
interface RawNotebookCell {
    language: string;
    value: string;
    kind: vscode.NotebookCellKind;
}
  
export  class SampleSerializer implements vscode.NotebookSerializer {
    async deserializeNotebook(
      content: Uint8Array,
      _token: vscode.CancellationToken
    ): Promise<vscode.NotebookData> {
      var contents = new TextDecoder().decode(content);
  
      let raw: RawNotebookCell[];
      try {
        raw = <RawNotebookCell[]>JSON.parse(contents);
      } catch {
        raw = [];
      }
  
      const cells = raw.map(
        item => new vscode.NotebookCellData(item.kind, item.value, item.language)
      );
  
      return new vscode.NotebookData(cells);
    }
  
    async serializeNotebook(
      data: vscode.NotebookData,
      _token: vscode.CancellationToken
    ): Promise<Uint8Array> {
      let contents: RawNotebookCell[] = [];
  
      for (const cell of data.cells) {
        contents.push({
          kind: cell.kind,
          language: cell.languageId,
          value: cell.value
        });
      }
  
      return new TextEncoder().encode(JSON.stringify(contents));
    }
  }

export  class Controller{
    readonly controllerId = 'my-notebook-controller-id';
    readonly notebookType = 'my-notebook';
    readonly label = 'My Notebook';
    readonly supportedLanguages = ['shell'];
  
    public readonly _controller: vscode.NotebookController;
    private _executionOrder = 0;
  
    constructor() {
      this._controller = vscode.notebooks.createNotebookController(
        this.controllerId,
        this.notebookType,
        this.label
      );
  
      this._controller.supportedLanguages = this.supportedLanguages;
      this._controller.supportsExecutionOrder = true;
      this._controller.executeHandler = this._execute.bind(this);
    }
  
    private _execute(
      cells: vscode.NotebookCell[],
      _notebook: vscode.NotebookDocument,
      _controller: vscode.NotebookController
    ): void {
      for (let cell of cells) {
        this._doExecution(cell);
      }
    }
  
    private async _doExecution(cell: vscode.NotebookCell): Promise<void> {
      const execution = this._controller.createNotebookCellExecution(cell);
      execution.executionOrder = ++this._executionOrder;
      execution.start(Date.now()); // Keep track of elapsed time to execute cell.
  
      /* Do some execution here; not implemented */
    
      execution.replaceOutput([
        new vscode.NotebookCellOutput([
          vscode.NotebookCellOutputItem.text(exec(cell.document.getText()))
        ])
      ]);
      execution.end(true, Date.now());
    }
  }