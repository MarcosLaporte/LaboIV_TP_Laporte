export class TriviaObj {
	question: string;
	answers: Array<{ correct: boolean, answer: string }>;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;

	constructor(question: string, answers: Array<{ correct: boolean, answer: string }>, difficulty: 'easy' | 'medium' | 'hard', category: string) {
		this.question = question;
		this.answers = answers
		this.difficulty = difficulty;
		this.category = category;
	}
}
