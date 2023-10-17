import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import Validator from 'validator';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent {
	email = "";
	password = "";
	passCheck = "";
	username = "";
	admin = false;

	constructor(private router: Router, private accountService: AccountService) { }

	newUsername() {
		let username: string = uniqueNamesGenerator({
			dictionaries: [adjectives, animals],
			separator: '-',
			length: 2,
			style: 'upperCase',
		});

		this.accountService.usernameExists(username)
			.then((existe) => {
				if (existe)
					this.newUsername();
				else
					this.username = username;
			});
	}

	async signUp() {
		const validations = [
			{
				condition: await this.accountService.emailExists(this.email),
				message: 'Another account is using the same email address.',
			},
			{
				condition: !Validator.isEmail(this.email),
				message: 'Enter a valid email address.',
			},
			{
				condition: this.password.length < 5,
				message: 'Password must be at least 5 characters long.',
			},
			{
				condition: this.password !== this.passCheck,
				message: "Passwords aren't the same!",
			},
			{
				condition: this.username == "",
				message: 'Generate a username first!'
			},
		];

		for (const val of validations) {
			if (val.condition) {
				Swal.fire('Oops...', val.message, 'error');
				return;
			}
		}

		this.accountService.saveUser(this.email, this.password, this.username, this.admin);
		this.accountService.signIn(this.email, this.password)
		this.router.navigate(['/home']);
	}
}
