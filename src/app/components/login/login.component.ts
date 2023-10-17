import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	email: string = "";
	password: string = "";

	constructor(private router: Router, private accountService: AccountService) { };

	signIn() {
		const userExists = this.accountService.signIn(this.email, this.password);
		userExists.then((existe) => { if (existe) this.router.navigate(['/home']) })
	}

	async quickFill() {
		this.email = "marcoslaporte2015@gmail.com";
		this.password = "UTNFRA";
		this.signIn();
	}
}
