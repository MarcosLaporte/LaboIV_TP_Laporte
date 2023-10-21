import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsApiService } from 'src/app/services/games/cards-api.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hi-or-lo',
	templateUrl: './hi-or-lo.component.html',
	styleUrls: ['./hi-or-lo.component.css']
})
export class HiOrLoComponent {
	Toast = Swal.mixin({
		toast: true,
		position: 'top-right',
		iconColor: 'white',
		showConfirmButton: false,
		timer: 1500,
	})

	score: number = 0;
	cardImg: string = "../../../../assets/card-joker.jpg";
	currentCardVal = 0;
	cardsLeft: number = 2; //TODO: change to 50

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
		Swal.showLoading();
		await this.cardsService.shuffleDeck();
		this.score = 0;
		this.cardsLeft = 2;

		await this.cardsService.getNextCard()
			.then((data) => {
				this.cardImg = data.cards[0].image;
				Swal.close();
				this.currentCardVal = this.cardsService.getCardValue(data.cards[0].value);
				this.flipCard = false;
			});
	}

	async checkGuess($event: any) {
		this.flipCard = true;
		Swal.showLoading();

		await this.cardsService.getNextCard()
			.then((data) => {
				this.cardImg = data.cards[0].image;
				this.cardsLeft--;
				if (this.cardsLeft >= 0) {
					const nextCardVal = this.cardsService.getCardValue(data.cards[0].value);
					const cardDifVal = nextCardVal - this.currentCardVal;
					Swal.close();
					this.flipCard = false;

					if (cardDifVal < 0 && $event.target.value == -1 || cardDifVal > 0 && $event.target.value == 1) {
						this.score++;
						this.Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
					} else if (cardDifVal == 0) {
						this.Toast.fire({ icon: 'warning', title: 'Tie!', background: '#3fc3ee' });
					} else {
						this.Toast.fire({ icon: 'error', title: 'Wrong!', background: '#f27474' });
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
			cancelButtonText: 'Home'
		}).then((res) => {
			if (res.isConfirmed)
				this.newGame();
			else
				this.router.navigate(['/home']);
		});
	}
}
