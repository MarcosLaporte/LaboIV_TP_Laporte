import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	loginForm: FormGroup;

	constructor(private router: Router, private accountService: AccountService, private fb: FormBuilder) {
		this.loginForm = fb.group({
			email: [
				'',
				[
					Validators.required,
					Validators.email,
				]
			],
			password: [
				'',
				[
					Validators.required,
				]
			]
		});
	}

	signIn() {
		const email = this.loginForm.get('email')?.value;
		const password = this.loginForm.get('password')?.value;

		const userExists = this.accountService.signIn(email, password);
		userExists.then((existe) => { if (existe) this.router.navigate(['/home']) })
	}

	async quickFill() {
		this.loginForm.patchValue({
			email: "marcoslaporte2015@gmail.com",
			password: "UTNFRA"
		})

		this.signIn();
	}
}
