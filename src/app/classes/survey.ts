export class Survey {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	phoneNO: number;
	favGame: string;
	suggestion: string;
	recommendation: number;

	constructor(firstName: string, lastName: string, email: string, age: number, phoneNO: number, favGame: string, suggestion: string, recommendation: number) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.age = age;
		this.phoneNO = phoneNO;
		this.favGame = favGame;
		this.suggestion = suggestion;
		this.recommendation = recommendation;
	}
}
