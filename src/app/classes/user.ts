export class User {
	username: string;
	email: string;
	password: string;
	admin: boolean;

	constructor(email: string, password: string, username: string, admin: boolean = false) {
		this.email = email;
		this.password = password;
		this.username = username;
		this.admin = admin;
	}
}
