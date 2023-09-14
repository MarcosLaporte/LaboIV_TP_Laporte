import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import Swal from 'sweetalert2';
import Validator from 'validator';

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
		if (!Validator.isEmail(this.email) || this.pass.length < 5) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Sorry, your data was incorrect. Check again.'
			});
			return;
		}

		User.saveUserToLS(this.email, this.pass, "-");
		this.router.navigate(['/home']);
	}
}
