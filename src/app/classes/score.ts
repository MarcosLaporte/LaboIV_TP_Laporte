import { User } from "./user";
export type Difficulty = 'easy' | 'medium' | 'hard' | 'default';
export class Score {
	user: User;
	score: number;
	game: string;
	difficulty: Difficulty;
	time: Date;

	constructor (user: User, score: number, game: string, difficulty: Difficulty, time: Date = new Date()) {
		this.user = user;
		this.score = score;
		this.game = game;
		this.difficulty = difficulty;
		this.time = time;
	}
}
