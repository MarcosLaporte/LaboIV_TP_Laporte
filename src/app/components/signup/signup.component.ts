import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UtilitiesService } from 'src/app/utilities.service';
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
	pass = "";
	passCheck = "";
	username = "";

	constructor(private router: Router) { }

	newUsername() {
		let username: string;
		do {
			username = uniqueNamesGenerator({
				dictionaries: [adjectives, animals],
				separator: '-',
				length: 2,
				style: 'upperCase',
			});
		} while (UtilitiesService.usernameExists(username));

		this.username = username;
	}

	static saveUserToLS(newUser: User) {
		let arrayUsers: Array<User> = UtilitiesService.getUsers();

		arrayUsers.push(newUser);
		localStorage.setItem("users", JSON.stringify([arrayUsers]));
	}

	signUp() {
		const validations = [
			{
				condition: !Validator.isEmail(this.email),
				message: 'Enter a valid email address.',
			},
			{
				condition: UtilitiesService.emailExists(this.email),
				message: 'Another account is using the same email address.',
			},
			{
				condition: this.pass.length < 5,
				message: 'Password must be at least 5 characters long.',
			},
			{
				condition: this.pass !== this.passCheck,
				message: "Passwords aren't the same!",
			},
			{
				condition: this.username == "",
				message: 'Generate a username first!'
			},
		];

		for (const validation of validations) {
			if (validation.condition) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: validation.message,
				});
				return;
			}
		}

		let newUser = new User(this.email, this.pass, this.username);
		SignupComponent.saveUserToLS(newUser);
		UtilitiesService.saveUserLog(newUser);
		this.router.navigate(['/home']);
	}
}
