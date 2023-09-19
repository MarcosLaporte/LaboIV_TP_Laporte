import { Injectable } from '@angular/core';
import { User } from './classes/user';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {
	constructor() { }

	static getUsers(): Array<User> {
		let lsUsers = localStorage.getItem("users");
		let arrayUsers: Array<User> = [];
		if (lsUsers !== null)
			arrayUsers = JSON.parse(lsUsers);

		return arrayUsers;
	}

	static emailExists(email: string) {
		let arrayUsers = this.getUsers();
		for (let i = 0; i < arrayUsers.length; i++) {
			const usr = arrayUsers[i];
			if (usr.email == email)
				return true;
		}

		return false;
	}

	static usernameExists(username: string) {
		let arrayUsers = this.getUsers();
		for (let i = 0; i < arrayUsers.length; i++) {
			const user = arrayUsers[i];
			if (user.username == username)
				return true;
		}

		return false;
	}

	static getLogs(): Array<[string, string]> {
		let lsLogs = localStorage.getItem("logs");
		let arrayLogs: Array<[string, string]> = [];
		if (lsLogs !== null)
			arrayLogs = JSON.parse(lsLogs);

		return arrayLogs;
	}

	static saveUserLog(user: User) {
		let arrayLogs: Array<[string, string]> = UtilitiesService.getLogs();

		let dateStr = (new Date()).toLocaleString();
		let newLog: [string, string] = [user.email, dateStr];
		
		arrayLogs.push(newLog);
		localStorage.setItem("logs", JSON.stringify(arrayLogs));
	}
}
