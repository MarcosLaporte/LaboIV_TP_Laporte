import { Component } from '@angular/core';
import { Router } from '@angular/router';
import arrayShuffle from 'array-shuffle';
import { daltonize, RGBColor } from 'daltonize';
import { Toast } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-color-test',
	templateUrl: './color-test.component.html',
	styleUrls: ['./color-test.component.css']
})
export class ColorTestComponent {
	baseColor: string = '';
	currentPalette: string[] = [];
	private diffColor: string = '';

	constructor(private router: Router) { }

	score: number = 0;
	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';

	newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'block';

		this.baseColor = '';
		this.currentPalette = this.newPalette();
		this.score = 0;

	}

	newPalette(): Array<string> {
		this.currentPalette = [];
		const baseColorRGB: number[] = this.generateRandomColor();
		const diffColorRGB: number[] = daltonize(baseColorRGB as RGBColor, "protanope");

		this.baseColor = `rgb(${baseColorRGB[0]}, ${baseColorRGB[1]}, ${baseColorRGB[2]})`;
		this.diffColor = `rgb(${diffColorRGB[0]}, ${diffColorRGB[1]}, ${diffColorRGB[2]})`;
		for (let i = 0; i < 8; i++) {
			this.currentPalette.push(this.baseColor);
		}
		this.currentPalette.push(this.diffColor);

		return arrayShuffle(this.currentPalette);
	}

	generateRandomColor(): number[] {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return [r, g, b];
	}

	pickColor(colorPicked: string) {
		if (colorPicked == this.diffColor) {
			this.score++;
			Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
			this.currentPalette = this.newPalette();
		} else {
			Swal.fire({
				icon: 'error',
				title: 'You lost!',
				confirmButtonText: 'New game',
				showCancelButton: true,
				cancelButtonText: 'Home',
				allowEscapeKey: false,
				allowOutsideClick: false
			}).then((res) => {
				if (res.isConfirmed)
					this.newGame();
				else
					this.router.navigate(['/home']);
			});
		}
	}
}
