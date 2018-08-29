import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class GistProvider implements vscode.TreeDataProvider<Gist> {

	private _onDidChangeTreeData: vscode.EventEmitter<Gist | undefined> = new vscode.EventEmitter<Gist | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Gist | undefined> = this._onDidChangeTreeData.event;

	constructor() {
		
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
		
	getTreeItem(element: Gist): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: Gist | undefined): vscode.ProviderResult<Gist[]> {
		throw new Error("Method not implemented.");
	}


}

class Gist extends vscode.TreeItem {

}