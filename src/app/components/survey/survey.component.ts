import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Survey } from 'src/app/classes/survey';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
	surveyForm: FormGroup;

	constructor(private dbService: DatabaseService, private fb: FormBuilder, private router: Router) {
		this.surveyForm = fb.group({
			firstName: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[a-z/A-Z]/),
				]
			],
			lastName: [
				'',
				[
					Validators.required,
					Validators.pattern(/^[a-z/A-Z]+$/),
				]
			],
			email: [
				'',
				[
					Validators.required,
					Validators.email,
				]
			],
			age: [
				18,
				[
					Validators.required,
					Validators.min(18),
					Validators.max(99),
				]
			],
			phoneNo: [
				'',
				[
					Validators.required,
					Validators.pattern(/^\d{10}$/),
				]
			],
			favGame: [
				'',
				[
					Validators.required,
					this.favGameValidator,
				]
			],
			suggestion: [
				'',
				[
					Validators.required,
					Validators.maxLength(255),
				]
			],
			recommendation: [
				5,
				[
					Validators.required,
					Validators.min(1),
					Validators.max(5),
				]
			]
		});
	}

	private favGameValidator(control: AbstractControl): null | object {
		const game = <string>control.value;
		const validGames = ['hangman', 'hi-lo', 'trivia', 'color-test', 'none'];

		if (!validGames.includes(game)) {
			return { validGame: true };
		}

		return null;
	}

	async submit() {
		const firstName = this.surveyForm.get('firstName')?.value;
		const lastName = this.surveyForm.get('lastName')?.value;
		const email = this.surveyForm.get('email')?.value;
		const age = this.surveyForm.get('age')?.value;
		const phone = this.surveyForm.get('phoneNo')?.value;

		const favGame = this.surveyForm.get('favGame')?.value;
		const suggestion = this.surveyForm.get('suggestion')?.value;
		const recommendation = this.surveyForm.get('recommendation')?.value;

		const surveyObj = new Survey(firstName, lastName, email, age, phone, favGame, suggestion, recommendation);
		this.dbService.agregarDatos('surveys', surveyObj);
		await Swal.fire({
			icon: 'success',
			title: 'Survey submitted!',
			confirmButtonText: 'New survey',
			showCancelButton: true,
			cancelButtonText: 'Home',
			allowEscapeKey: false,
			allowOutsideClick: false
		}).then((res) => {
			if (res.isConfirmed)
				location.reload();
			else
				this.router.navigate(['/home']);
		});
	}

	clearInputs() {
		this.surveyForm.setValue({
			firstName: '',
			lastName: '',
			email: '',
			age: 18,
			phoneNo: '',
			favGame: '',
			suggestion: '',
			recommendation: 5
		});
	}
}
