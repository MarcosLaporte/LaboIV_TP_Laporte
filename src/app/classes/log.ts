import { User } from "./user";

export class Log {
	user: User;
	logDate: Date;

	constructor (user: User, date: Date = new Date()) {
		this.user = user;
		this.logDate = date;
	}
}
