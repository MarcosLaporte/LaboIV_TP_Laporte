import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class GamesComponent {
	constructor(private router: Router, private accService: AccountService) { }

	selecGame(game: string) {
		if (this.accService.getUserInSession() !== undefined)
			this.router.navigate(['games/' + game]);
		else
			this.router.navigate(['/login']);
	}


}
