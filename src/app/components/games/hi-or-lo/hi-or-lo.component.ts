import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsApiService } from 'src/app/services/games/cards-api.service';
import Swal from 'sweetalert2';
import { Loader, Toast } from 'src/environments/environment';

@Component({
	selector: 'app-hi-or-lo',
	templateUrl: './hi-or-lo.component.html',
	styleUrls: ['./hi-or-lo.component.css']
})
export class HiOrLoComponent {
	score: number = 0;
	cardImg: string = "../../../../assets/card-joker.jpg";
	currentCardVal = 0;
	cardsLeft: number = 50;

	constructor(private cardsService: CardsApiService, private router: Router) { }

	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';
	flipCard: boolean = false;

	async newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'grid';

		this.flipCard = true;
		Loader.fire({title: 'Loading deck of cards...'});
		await this.cardsService.shuffleDeck();
		this.score = 0;
		this.cardsLeft = 50;

		await this.cardsService.getNextCard()
			.then((data) => {
				this.cardImg = data.cards[0].image;
				Loader.close();
				this.currentCardVal = this.cardsService.getCardValue(data.cards[0].value);
				this.flipCard = false;
			});
	}

	async checkGuess($event: any) {
		this.flipCard = true;
		Loader.fire({title: 'Checking values...'});

		await this.cardsService.getNextCard()
			.then((data) => {
				this.cardImg = data.cards[0].image;
				this.cardsLeft--;
				if (this.cardsLeft >= 0) {
					const nextCardVal = this.cardsService.getCardValue(data.cards[0].value);
					const cardDifVal = nextCardVal - this.currentCardVal;
					Loader.close();
					this.flipCard = false;

					if (cardDifVal < 0 && $event.target.value == -1 || cardDifVal > 0 && $event.target.value == 1) {
						this.score++;
						Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
					} else if (cardDifVal == 0) {
						Toast.fire({ icon: 'warning', title: 'Tie!', background: '#3fc3ee' });
					} else {
						Toast.fire({ icon: 'error', title: 'Wrong!', background: '#f27474' });
					}

					this.currentCardVal = nextCardVal;
					if (this.cardsLeft == 0) this.gameOver();
				}
				else this.gameOver();
			});
	}

	gameOver() {
		Swal.fire({
			icon: 'success',
			title: 'GAME OVER',
			text: `You scored ${this.score} points.`,
			confirmButtonText: 'New game',
			focusConfirm: true,
			showCancelButton: true,
			cancelButtonText: 'Home',
			allowOutsideClick: false
		}).then((res) => {
			if (res.isConfirmed)
				this.newGame();
			else
				this.router.navigate(['/home']);
		});
	}
}
