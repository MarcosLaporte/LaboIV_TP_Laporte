import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WordsApiService } from 'src/app/services/games/words-api.service';
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
	wordDisplayVal: string = "";
	wrongGuesses: Array<string> = [];
	score: number = 0;
	newGameFlag: boolean = false;

	constructor(private router: Router, private wordsService: WordsApiService) { }

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

	private rightGuess(letter: string) {
		this.addLetter(letter);
		if (this.wordDisplayVal === this.secretWrd) {
			this.score++;
			Swal.fire({
				icon: 'success',
				title: 'You won!',
				text: `With only ${this.wrongGuesses.length} wrong guesses.`,
				confirmButtonText: 'New game',
				showCancelButton: true,
				cancelButtonText: 'Home'
			}).then((res) => {
				if (res.isConfirmed)
					this.newGame();
				else
					this.router.navigate(['/home']);
			});
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
				Swal.fire({
					icon: 'error',
					title: 'You lost!',
					text: `You have no attempts left. The word was: ${this.secretWrd}.`,
					confirmButtonText: 'New game',
					showCancelButton: true,
					cancelButtonText: 'Home'
				}).then((res) => {
					if (res.isConfirmed)
						this.newGame();
					else
						this.router.navigate(['/home']);
				});
			}
		}
	}
}
