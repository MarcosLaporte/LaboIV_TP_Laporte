import { Component } from '@angular/core';
import { Router } from '@angular/router';
import arrayShuffle from 'array-shuffle';
import { Score } from 'src/app/classes/score';
import { TriviaObj } from 'src/app/classes/trivia-obj';
import { AuthService } from 'src/app/services/auth.service';
import { TriviaApiService } from 'src/app/services/games/trivia-api.service';
import { UtilService } from 'src/app/services/games/util.service';
import { Loader, Toast } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-trivia',
	templateUrl: './trivia.component.html',
	styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
	triviaArr: Array<TriviaObj> = [];
	currentTrivia: TriviaObj | any;
	questionNum: number = 0;

	constructor(
		private triviaService: TriviaApiService,
		private utilService: UtilService,
		private router: Router,
		private auth: AuthService
	) { }

	score: number = 0;
	headerDisplaySty: string = 'fixed';
	navbarDisplaySty: string = 'none';
	gameDisplaySty: string = 'none';
	difficulty: 'easy' | 'medium' | 'hard' = 'easy';

	async newGame() {
		this.headerDisplaySty = 'none';
		this.navbarDisplaySty = 'block';
		this.gameDisplaySty = 'grid';

		this.triviaArr = [];
		this.questionNum = 0;
		this.score = 0;
		await this.chooseDifficulty();
		Swal.fire(`Difficulty: ${this.difficulty}`, '', 'info');

		await this.newQuiz();
		await this.nextQuestion();
	}

	async chooseDifficulty() {
		await Swal.fire({
			title: 'Choose the difficulty of the questions.',
			showConfirmButton: true,
			confirmButtonText: 'Easy',
			confirmButtonColor: 'gray',
			focusConfirm: false,

			showDenyButton: true,
			denyButtonText: 'Medium',
			denyButtonColor: 'green',

			showCancelButton: true,
			cancelButtonText: 'Hard',
			cancelButtonColor: 'red',

			showLoaderOnConfirm: true,
			allowEscapeKey: false,
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed)
				this.difficulty = 'easy';
			else if (result.isDenied)
				this.difficulty = 'medium';
			else
				this.difficulty = 'hard';
		});
	}

	async newQuiz() {
		Loader.fire({ title: 'Getting quiz...' });
		await this.triviaService.getQuiz(this.difficulty)
			.then((data) => {
				for (const trivia of data.results) {
					const answers: Array<{ correct: boolean, answer: string }> = arrayShuffle([
						{ correct: true, answer: atob(trivia.correct_answer) },
						{ correct: false, answer: atob(trivia.incorrect_answers[0]) },
						{ correct: false, answer: atob(trivia.incorrect_answers[1]) },
						{ correct: false, answer: atob(trivia.incorrect_answers[2]) }
					]);

					this.triviaArr.push(new TriviaObj(atob(trivia.question), answers, trivia.difficulty, trivia.category));
				}
			});
		Loader.close();
	}

	async pickAns(answer: string) {
		const correctAnswer = TriviaComponent.getCorrectAnswer(this.currentTrivia);
		if (answer == correctAnswer) {
			this.score++;
			Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
			this.nextQuestion();
		} else {
			if (this.auth.loggedUser) {
				const scoreObj = new Score(this.auth.loggedUser, this.score, 'trivia', this.difficulty, new Date());
				const newGameRes = await this.utilService.gameOver(scoreObj, { title: 'You lost!', text: `Right answer was: '${correctAnswer}'.`, icon: 'error' });
				if (newGameRes)
					this.newGame();
				else
					this.router.navigateByUrl('home');
			}
		}
	}

	async nextQuestion() {
		this.currentTrivia = this.triviaArr[this.questionNum];
		this.questionNum++;
		if (this.questionNum > 0 && this.questionNum % 50 == 0)
			await this.newQuiz(); // A Maximum of 50 Questions can be retrieved per call to the API.

	}

	private static getCorrectAnswer(trivia: TriviaObj): string {
		for (const ans of trivia.answers) {
			if (ans.correct)
				return ans.answer;
		}

		return '';
	}
}
