export class User {
	username = "";
	email = "";
	pass = "";

	constructor(email:string, pass:string, username:string){
		this.email = email;
		this.pass = pass;
		this.username = username;
	}

	static saveUserToLS(email:string, pass:string, username:string) {
		let newUser: User = new User(email, pass, username);
		localStorage.setItem("savedUser", JSON.stringify(newUser));
	}

}
