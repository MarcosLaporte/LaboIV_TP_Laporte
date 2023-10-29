import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent {
	signUpForm: FormGroup;

	constructor(private router: Router, private accountService: AccountService, private fb: FormBuilder) {
		this.signUpForm = fb.group({
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
					Validators.minLength(6),
					Validators.maxLength(20),
				]
			],
			passCheck: [
				'',
				[
					Validators.required,
					this.passwordMatchValidator,
				]
			],
			username: [
				'',
				[
					Validators.required,
				]
			],
			admin: [
				false,
			]
		});
	}

	private passwordMatchValidator(control: AbstractControl): null | object {
		const password = control.parent?.value.password;
		const passCheck = <string>control.value;

		if (password !== passCheck) {
			return { passwordMismatch: true };
		}

		return null;
	}

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
					this.signUpForm.patchValue({ username: username });
			});
	}

	async signUp() {
		const email = this.signUpForm.get('email')?.value;
		const password = this.signUpForm.get('password')?.value;
		const username = this.signUpForm.get('username')?.value;
		const admin = this.signUpForm.get('admin')?.value;

		this.accountService.saveUser(email, password, username, admin);
		this.accountService.signIn(email, password)
		this.router.navigateByUrl('home');
	}
}
