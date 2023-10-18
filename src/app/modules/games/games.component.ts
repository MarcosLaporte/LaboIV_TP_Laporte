import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class GamesComponent {
	constructor(private router: Router) { }

	selecGame(game: string) {
		let ss = sessionStorage.getItem('loggedUser');
		if (ss !== null)
			this.router.navigate(['games/' + game]);
		else
			this.router.navigate(['/login']);
	}


}
