import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getUserInSession } from 'src/environments/environment';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css'],
})
export class GamesComponent {
	constructor(private router: Router) { }

	selecGame(game: string) {
		if (getUserInSession() !== undefined)
			this.router.navigate(['games/' + game]);
		else
			this.router.navigate(['/login']);
	}
}
