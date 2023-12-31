import { Component } from '@angular/core';
import { Router } from '@angular/router';
import arrayShuffle from 'array-shuffle';
import { daltonize, RGBColor } from 'daltonize';
import { Score } from 'src/app/classes/score';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/games/util.service';
import { Toast } from 'src/environments/environment';

@Component({
	selector: 'app-color-test',
	templateUrl: './color-test.component.html',
	styleUrls: ['./color-test.component.css']
})
export class ColorTestComponent {
	currentPalette: string[] = [];
	private diffColor: string = '';

	constructor(
		private utilService: UtilService,
		private router: Router,
		private auth: AuthService
	) { }

	score: number = 0;
	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';

	newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'block';

		this.currentPalette = this.newPalette();
		this.score = 0;
	}

	newPalette(): Array<string> {
		const newPalette = [];
		const baseColorRGB: number[] = this.generateRandomColor();
		const diffColorRGB: number[] = daltonize(baseColorRGB as RGBColor, "protanope");

		const baseColor = `rgb(${baseColorRGB[0]}, ${baseColorRGB[1]}, ${baseColorRGB[2]})`;
		this.diffColor = `rgb(${diffColorRGB[0]}, ${diffColorRGB[1]}, ${diffColorRGB[2]})`;
		for (let i = 0; i < 8; i++) {
			newPalette.push(baseColor);
		}
		newPalette.push(this.diffColor);

		return arrayShuffle(newPalette);
	}

	generateRandomColor(): number[] {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return [r, g, b];
	}

	async pickColor(colorPicked: string) {
		if (colorPicked == this.diffColor) {
			this.score++;
			Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
			this.currentPalette = this.newPalette();
		} else {
			if (this.auth.loggedUser) {
				const scoreObj = new Score(this.auth.loggedUser, this.score, 'color-test', 'default', new Date());
				const newGameRes = await this.utilService.gameOver(scoreObj, { title: 'You lost!', icon: 'error' });
				if (newGameRes)
					this.newGame();
				else
					this.router.navigateByUrl('home');
			}
		}
	}

}
