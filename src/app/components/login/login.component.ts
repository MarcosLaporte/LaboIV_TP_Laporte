import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import Swal from 'sweetalert2';
import { SignupComponent } from '../signup/signup.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	email: string = "";
	pass: string = "";

	constructor(private router: Router) { };

	signInToLS() {
		let user = LoginComponent.getUser(this.email, this.pass);
		if (user == null) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Sorry, your data was incorrect. Check again.'
			});
			return;
		}

		localStorage.setItem("loggedUser", JSON.stringify(user));
		this.router.navigate(['/home']);
	}

	static getUser(email: string, pass: string) {
		if (SignupComponent.emailExists(email)) {
			let array = User.getUsers();
			for (let i = 0; i < array.length; i++) {
				const usr: User = array[i];
				if (usr.email == email && usr.pass == pass)
					return usr;
			}
		}

		return null;
	}

	quickFill() {
		let users = User.getUsers();
		let rndmNum = Math.floor(Math.random() * users.length);
		let rndmUser = users[rndmNum];
		if (rndmUser !== null) {
			this.email = rndmUser.email;
			this.pass = rndmUser.pass;
		}
	}
}
