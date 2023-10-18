import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private router: Router, private accService: AccountService) {}
	title = 'TP_Laporte';

	accountBtn() {
		if (this.accService.getUserInSession() !== undefined)
			this.router.navigate(['/account']);
		else
			this.router.navigate(['/login']);
	}
}
