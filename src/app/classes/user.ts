export class User {
	username = "";
	email = "";
	pass = "";

	constructor(email: string, pass: string, username: string) {
		this.email = email;
		this.pass = pass;
		this.username = username;
	}

	static getUsers(): Array<User> {
		let lsUsers = localStorage.getItem("users");
		let arrayUsers: Array<User> = [];
		if (lsUsers !== null)
			arrayUsers = JSON.parse(lsUsers);

		return arrayUsers;
	}
}
