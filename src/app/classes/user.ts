export class User {
	username = "";
	email = "";
	pass = "";

	constructor(email: string, pass: string, username: string) {
		this.email = email;
		this.pass = pass;
		this.username = username;
	}
}
