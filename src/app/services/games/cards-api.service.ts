import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CardsApiService {
	readonly initPath = 'https://deckofcardsapi.com/api/deck/';
	private deckId: string = '';

	async shuffleDeck() {
		try {
			const response = await fetch(this.initPath + 'new/shuffle/')
				.catch((er) => { throw er });
			const data = await response.json();
			this.deckId = data.deck_id;
		} catch (error) {
			throw error;
		}
	}

	async getNextCard() {
		try {
			const response = await fetch(this.initPath + this.deckId + '/draw/')
				.catch((er) => { throw er });

			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	getCardValue(card: any): number {
		switch (card) {
			case 'ACE':
				return 1;
			case 'JACK':
				return 11;
			case 'QUEEN':
				return 12;
			case 'KING':
				return 13;
			default:
				return Number.parseInt(card);
		}
	}
}
