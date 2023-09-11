export class User {
	username = "";
	email = "";
	pass = "";

	constructor(email:string, pass:string){
		this.email = email;
		this.pass = pass;
		// this.username = generateUsername("-", 2);
	}

	static saveUserToLS(email:string, pass:string) {
		let newUser: User = new User(email, pass);
		localStorage.setItem("savedUser", JSON.stringify(newUser));
	}
}
