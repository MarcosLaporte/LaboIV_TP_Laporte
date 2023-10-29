import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	protected logged: boolean;

	constructor(private router: Router) {
		this.logged = inject(AuthService).isLogged;
		router.navigateByUrl(this.logged ? 'home' : 'login');
	}
	title = 'TP_Laporte';
}
