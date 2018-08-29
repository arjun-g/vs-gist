import * as Octokit from '@octokit/rest'
import * as request from 'request-promise';
import * as path from 'path';
import * as fs from 'fs';

export class GistApi {

	octokit: Octokit

	constructor(token: string) {
		this.octokit = new Octokit();
		this.octokit.authenticate({
			type: "token",
			token
		});
	}

	async getAll(): Promise<Array<Gist>> {
		let result = await this.octokit.gists.getAll({});
		if (result.status === 200) {
			return result.data;
			// return Array.from(result.data).map(gistObj => {
			// 	return new Gist(gistObj);
			// });
		}
		else {
			throw new Error('Fetch Failed');
		}
	}

	async getPublic() {
		let result = await this.octokit.gists.
	}

}

export class Gist {

	id: string
	nodeId: string
	description: string
	public: boolean
	url: string
	files: Array<GistFile> = [];

	constructor(gistObj: any) {
		this.id = gistObj.id;
		this.nodeId = gistObj.node_id;
		this.description = gistObj.description;
		this.public = gistObj.public;
		this.url = gistObj.url;
		this.files = Object.keys(gistObj.files).map(filename => {
			return new GistFile(gistObj.files[filename]);
		});
	}

}

export class GistFile {

	fileName: string;
	type: string;
	language: string;
	rawUrl: string;
	size: number

	constructor(gistFileObj: any) {
		this.fileName = gistFileObj.filename;
		this.type = gistFileObj.type;
		this.language = gistFileObj.language;
		this.rawUrl = gistFileObj.raw_url;
		this.size = gistFileObj.size;
	}

	async downloadFile(folder: string) {
		let filePath = path.join(folder, this.fileName);
		return new Promise((resolve, reject) => {
			request({
				uri: this.rawUrl,
				method: 'POST'
			})
			.on('error', () => {
				reject();
			})
			.pipe(fs.createWriteStream(filePath))
			.on('close', () => {
				resolve();
			});
		});
	}

}