import { Component } from '@angular/core';
import { CardsApiService } from 'src/app/services/games/cards-api.service';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hi-or-lo',
	templateUrl: './hi-or-lo.component.html',
	styleUrls: ['./hi-or-lo.component.css']
})
export class HiOrLoComponent {
	score: number = 0;
	cardImg: string = "";
	currentCardVal = 0;
	cardsLeft: number = 50;

	constructor(private cardsService: CardsApiService, private toast: NgToastService) { }

	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';


	async newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'grid';

		await this.cardsService.shuffleDeck();
		this.score = 0;

		await this.cardsService.getNextCard()
			.then((data) => {
				this.cardImg = data.cards[0].image;
				this.currentCardVal = this.cardsService.getCardValue(data.cards[0].value);
			});
	}

	async checkGuess($event: any) {
		if (this.cardsLeft > 0) {
			Swal.fire({
				imageUrl: '../../../assets/loader2.gif',
				imageWidth: 300,
				imageHeight: 300,
				imageAlt: 'loader',
				showConfirmButton: false,
				allowOutsideClick: false
			});

			await this.cardsService.getNextCard()
				.then((data) => {
					this.cardImg = data.cards[0].image;
					this.cardsLeft = data.remaining;
					const cardDifVal = this.cardsService.getCardValue(data.cards[0].value) - this.currentCardVal;
					if (cardDifVal < 0 && $event.target.value == -1
						|| cardDifVal > 0 && $event.target.value == 1
						|| cardDifVal == 0 && $event.target.value == 0) {
						this.score++;
						this.toast.success({ detail: "CORRECT!", duration: 5000, position: 'topRight' });
					}
					else {
						this.toast.error({ detail: "WRONG!", duration: 5000, position: 'topRight' });
					}
				});

			Swal.close();
		}
	}
}
