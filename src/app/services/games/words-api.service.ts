import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WordsApiService {
	private readonly apiKey = 'KB2SMNM4sOLmciGbx9V9SqPVvnyDHYYdJy5hpRkw';
	readonly initPath = 'https://api.api-ninjas.com/v1/';

	async getRandomWord() {
		try {
			const response = await fetch(this.initPath + 'randomword', { headers: { 'X-Api-Key': this.apiKey } })
				.catch((er) => { throw er });
				
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	async getDefinition(word: string) {
		try {
			const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
				.catch((er) => { throw er });
				
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}
}
