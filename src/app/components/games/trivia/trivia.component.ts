import { Component } from '@angular/core';
import { Router } from '@angular/router';
import arrayShuffle from 'array-shuffle';
import { TriviaObj } from 'src/app/classes/trivia-obj';
import { TriviaApiService } from 'src/app/services/games/trivia-api.service';
import { Toast } from 'src/environments/environment';
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

	constructor(private triviaService: TriviaApiService, private router: Router) { }

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
		await this.chooseDifficulty();
		Swal.fire(`Difficulty: ${this.difficulty}`, '', 'info');
		Swal.showLoading();

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

		this.nextQuestion();
		Swal.close();
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

	nextQuestion() {
		this.questionNum++;
		this.currentTrivia = this.triviaArr[this.questionNum];
			// TODO: No limit to the questions. Play until wrong answer

	}

	pickAns(answer: string) {
		const correctAnswer = this.getCorrectAnswer(this.currentTrivia);
		if (answer == correctAnswer) {
			this.score++;
			Toast.fire({ icon: 'success', title: 'Correct!', background: '#a5dc86' });
		} else {
			Toast.fire({ icon: 'error', title: 'Wrong!', background: '#f27474' });
		}
		
		this.nextQuestion();
	}

	private getCorrectAnswer(trivia: TriviaObj): string {
		for (const ans of trivia.answers) {
			if (ans.correct)
				return ans.answer;
		}

		return '';
	}
}
