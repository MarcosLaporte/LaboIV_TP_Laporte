import { Component, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
	constructor() { }
	backgroundColor = '';

	changeBackground() {
		var deg = Math.floor(Math.random() * 360);
		var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() + ")";

		this.backgroundColor = gradient;
	}
}

function createHex() {
	var hexCode1 = "";
	var hexValues1 = "0123456789abcdef";

	for (var i = 0; i < 6; i++) {
		hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
	}
	return hexCode1;
}