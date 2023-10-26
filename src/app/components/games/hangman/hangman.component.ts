import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from 'src/app/classes/score';
import { UtilService } from 'src/app/services/games/util.service';
import { WordsApiService } from 'src/app/services/games/words-api.service';
import { Loader, Toast, getUserInSession } from 'src/environments/environment';

@Component({
	selector: 'app-hangman',
	templateUrl: './hangman.component.html',
	styleUrls: ['./hangman.component.css']
})

export class HangmanComponent {
	user: any;
	imgNumber = 0;
	protected secretWrd: string = "";
	protected definition: string = "";
	wordDisplayVal: string = "";
	wrongGuesses: Array<string> = [];
	score: number = 0;
	newGameFlag: boolean = false;

	constructor(private wordsService: WordsApiService, private utilService: UtilService, private router: Router) {
		const usr = getUserInSession();
		if (usr !== undefined)
			this.user = usr;
		else {
			router.navigate(['/login']);
			Toast.fire({ icon: 'error', title: 'Error!', text: 'No user in session.', background: '#f27474' });
		}
	}

	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';

	async newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'grid';
		this.imgNumber = 0;
		this.wordDisplayVal = '';
		this.wrongGuesses = [];

		Loader.fire({ title: 'Loading new word...' });
		await this.getWordAndDef();
		Loader.close();

		this.newGameFlag = !this.newGameFlag;
	}

	async getWordAndDef() {
		await this.wordsService.getRandomWord()
			.then((data) => this.secretWrd = data.word.toUpperCase())
			.catch(() => this.getWordAndDef());

		await this.wordsService.getDefinition(this.secretWrd)
			.then((data) => this.definition = data[0].meanings[0].definitions[0].definition)
			.catch(() => this.getWordAndDef());

		this.wordDisplayVal = '';
		for (let i = 0; i < this.secretWrd.length; i++) {
			this.wordDisplayVal += '₋';
		}
	}

	setImage() {
		return `../../../assets/hangman/pos-${this.imgNumber}.jpg`;
	}

	checkLetter($event: string) {
		if (this.secretWrd.includes($event))
			this.rightGuess($event);
		else
			this.wrongGuess($event);
	}

	private async rightGuess(letter: string) {
		this.addLetter(letter);
		if (this.wordDisplayVal === this.secretWrd) {
			this.score++;
			const scoreObj = new Score(this.user, this.score, 'hangman', 'default', new Date());
			const newGameRes = await this.utilService.gameOver(scoreObj, { title: 'You won!', text: `With ${this.wrongGuesses.length} wrong guesses.`, icon: 'success' });
			if (newGameRes)
				await this.newGame();
			else
				this.router.navigate(['/home']);
		}
	}

	private addLetter(letter: string) {
		let wordAux: string = "";

		for (let i = 0; i < this.secretWrd.length; i++) {
			const character = this.secretWrd[i];
			if (character == letter) {
				wordAux += letter;
			} else {
				wordAux += this.wordDisplayVal[i];
			}
		}

		this.wordDisplayVal = wordAux;
	}

	private async wrongGuess(letter: string) {
		this.wrongGuesses.push(letter);
		if (this.imgNumber < 6) {
			this.imgNumber++;
			this.setImage();
			if (this.imgNumber === 6) {
				const scoreObj = new Score(this.user, this.score, 'hangman', 'default', new Date());
				const newGameRes = await this.utilService.gameOver(scoreObj, { title: 'You lost!', text: `You have no attempts left. The word was: ${this.secretWrd}.`, icon: 'error' });
				if (newGameRes)
					await this.newGame();
				else
					this.router.navigate(['/home']);
			}
		}
	}
}
