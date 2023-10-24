import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TriviaApiService {
	readonly openTDB: string = 'https://opentdb.com/api.php?amount=50&type=multiple&encode=base64&difficulty=';
	constructor() { }

	async getQuiz(difficulty: string) {
		try {
			const response = await fetch(this.openTDB + difficulty)
				.catch((er) => { throw er });

			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}
}
