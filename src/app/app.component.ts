import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private router: Router) {}
	title = 'TP_Laporte';

	accountBtn() {
		let ss = sessionStorage.getItem('loggedUser');
		if (ss !== null)
			this.router.navigate(['/account']);
		else
			this.router.navigate(['/login']);
	}
}
