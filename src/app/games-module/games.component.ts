import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Toast } from 'src/environments/environment';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css'],
})
export class GamesComponent {
	constructor(private router: Router, private auth: AuthService) { }

	selecGame(game: string) {
		const user = this.auth.getUserInSession();
		if (user === undefined) {
			Toast.fire({icon: 'error', title: 'Error', text: 'You must be signed in to play.', background: '#f27474'});
			this.router.navigateByUrl('login');
		} else this.router.navigateByUrl(`games/${game}`);
	}
}
