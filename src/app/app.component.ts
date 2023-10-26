import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getUserInSession } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private router: Router) {}
	title = 'TP_Laporte';

	getUser(){
		return getUserInSession();
	}

	accountBtn() {
		if (getUserInSession() !== undefined)
			this.router.navigate(['/account']);
		else
			this.router.navigate(['/login']);
	}

}
