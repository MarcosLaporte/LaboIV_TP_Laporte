export class User {
	username: string;
	email: string;
	pass: string;

	constructor(email: string, pass: string, username: string) {
		this.email = email;
		this.pass = pass;
		this.username = username;
	}
}
