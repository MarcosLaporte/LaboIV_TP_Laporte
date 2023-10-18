import { Component } from '@angular/core';
import { WordsApiService } from 'src/app/services/words-api.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hangman',
	templateUrl: './hangman.component.html',
	styleUrls: ['./hangman.component.css']
})

export class HangmanComponent {
	imgNumber = 0;
	protected secretWrd: string = "";
	protected definition: string = "";
	langToggle: boolean = false;
	wordDisplayVal: string = "";
	wrongGuesses: Array<string> = [];

	constructor(private wordsService: WordsApiService) { }

	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';

	score: number = 0;
	// private engWords: Array<string> = [];
	// private espWords: Array<string> = [];

	/* 	ngOnInit() {
			let lsEng = localStorage.getItem('enWords');
			let lsEsp = localStorage.getItem('esWords');
	
			this.engWords = lsEng != null ? JSON.parse(lsEng) : [];
			this.espWords = lsEsp != null ? JSON.parse(lsEsp) : [];
		} */

	async newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'grid';
		this.imgNumber = 0;
		this.wordDisplayVal = '';
		this.wrongGuesses = [];

		Swal.fire({
			imageUrl: '../../../assets/loader.gif',
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: 'loader',
			showConfirmButton: false,
			allowOutsideClick: false
		});

		await this.getWordAndDef();

		Swal.close();
	}

	async getWordAndDef() {
		await this.wordsService.getRandomWord()
			.then((data) => this.secretWrd = data.word.toUpperCase())
			.catch(() => this.getWordAndDef());

		await this.wordsService.getDefinition(this.secretWrd)
			.then((data) => this.definition = data[0].meanings[0].definitions[0].definition)
			.catch(() => this.getWordAndDef());

		console.log(this.definition);

		for (let i = 0; i < this.secretWrd.length; i++) {
			this.wordDisplayVal += '₋';
		}
	}

	setImage() {
		return `../../../assets/hangman/pos-${this.imgNumber}.jpg`;
	}

	/* onToggleChange() {
		this.newGame();
	} */

	checkLetter($event: string) {
		if (this.secretWrd.includes($event))
			this.rightGuess($event);
		else
			this.wrongGuess($event);
	}

	private rightGuess(letter: string) {
		this.addLetter(letter);
		if (this.wordDisplayVal === this.secretWrd) {
			Swal.fire('You won!', `With only ${this.wrongGuesses.length} wrong guesses.`, 'success',);
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

	private wrongGuess(letter: string) {
		this.wrongGuesses.push(letter);
		if (this.imgNumber < 6) {
			this.imgNumber++;
			this.setImage();
			if (this.imgNumber === 6) {
				Swal.fire('You lost!', `You have no attempts left. The word was: ${this.secretWrd}`, 'error',);
			}
		}
	}
}
