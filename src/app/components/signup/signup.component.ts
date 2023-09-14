import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
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
		} while (SignupComponent.usernameExists(username));

		this.username = username;
	}

	static saveUserToLS(email: string, pass: string, username: string) {
		let arrayUsers: Array<User> = User.getUsers();

		let newUser: User = new User(email, pass, username);
		arrayUsers.push(newUser);
		localStorage.setItem("users", JSON.stringify([arrayUsers]));
	}

	signUpToLS() {
		const validations = [
			{
				condition: !Validator.isEmail(this.email),
				message: 'Enter a valid email address.',
			},
			{
				condition: SignupComponent.emailExists(this.email),
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

		SignupComponent.saveUserToLS(this.email, this.pass, this.username);
		this.router.navigate(['/home']);
	}

	static emailExists(email: string) {
		let arrayUsers = User.getUsers();
		for (let i = 0; i < arrayUsers.length; i++) {
			const usr = arrayUsers[i];
			if (usr.email == email)
				return true;
		}

		return false;
	}

	static usernameExists(username: string) {
		let arrayUsers = User.getUsers();
		for (let i = 0; i < arrayUsers.length; i++) {
			const user = arrayUsers[i];
			if (user.username == username)
				return true;
		}

		return false;
	}
}
