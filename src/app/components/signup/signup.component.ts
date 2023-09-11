import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import Swal from 'sweetalert2';
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

	constructor(private router: Router) { }


	signUpToLS() {
		const validations = [
			{
				condition: !Validator.isEmail(this.email),
				message: 'Enter a valid email address.',
			},
			/* {
				condition: SignupComponent.emailExists(this.email),
				message: 'This email address already exists!',
			}, */
			{
				condition: this.pass.length < 5,
				message: 'Password must be at least 5 characters long.',
			},
			{
				condition: this.pass !== this.passCheck,
				message: "Passwords aren't the same!",
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

		User.saveUserToLS(this.email, this.pass);
		this.router.navigate(['/home']);
	}

	/* static emailExists(email: string) {
		let lsUser: User | null = this.readUserFromLS();
		return lsUser !== null && lsUser.email == email;
	} */

	static readUserFromLS() {
		let ls: string | null = localStorage.getItem("savedUser");
		if (ls !== null) {
			let user: User = JSON.parse(ls);
			console.log(user);
			return user;
		}

		return null;
	}

}
