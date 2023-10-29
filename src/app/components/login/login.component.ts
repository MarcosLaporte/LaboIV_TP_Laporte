import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	loginForm: FormGroup;

	constructor(private router: Router, private auth: AuthService, private fb: FormBuilder) {
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

		const userExists = this.auth.signIn(email, password);
		userExists.then((existe) => { if (existe) this.router.navigateByUrl('home') })
	}

	async quickFill() {
		this.loginForm.patchValue({
			email: "marcoslaporte2015@gmail.com",
			password: "UTNFRA"
		})

		this.signIn();
	}
}
