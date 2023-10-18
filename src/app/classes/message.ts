import { User } from "./user";

export class Message {
	user: User;
	message: string;
	time: Date;

	constructor(user: User, message: string, time: Date = new Date()) {
		this.user = user;
		this.message = message;
		this.time = time;
	}
}
