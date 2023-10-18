import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { User } from '../classes/user';
import Swal from 'sweetalert2';
const userPath = 'users';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private userInSession: User | undefined;

	constructor(private dbService: DatabaseService) {
		const ss = sessionStorage.getItem('loggedUser');
		if (ss !== null)
			this.userInSession = JSON.parse(ss) as User;
	}

	getUserInSession(): User | undefined {
		return this.userInSession;
	}

	logOutFromSession() {
		sessionStorage.removeItem('loggedUser');
		this.userInSession = undefined;
	}

	async signIn(email: string, pass: string) {
		const user = await this.searchUser(email, pass);
		if (user === null) {
			Swal.fire('Oops...', 'Sorry, your data was incorrect. Check again.', 'error',);
			return false;
		}

		this.dbService.agregarDatos('logs', { email: email, admin: user.admin, log: new Date() });
		sessionStorage.setItem('loggedUser', JSON.stringify(user));
		this.userInSession = user;
		return true;
	}

	async searchUser(email: string, password: string) {
		if (await this.emailExists(email)) {
			const arrayUsers = await this.dbService.traerDatos<User>(userPath);
			for (const user of arrayUsers) {
				if (user.email == email && user.password == password)
					return user;
			}
		}

		return null;
	}

	async emailExists(email: string): Promise<boolean> {
		const arrayUsers = await this.dbService.traerDatos<User>(userPath);
		return arrayUsers.some((u) => u.email === email);

	}

	async usernameExists(username: string): Promise<boolean> {
		const arrayUsers = await this.dbService.traerDatos<User>(userPath);
		return arrayUsers.some((u) => u.username === username);
	}

	saveUser(email: string, password: string, username: string, admin: boolean) {
		this.dbService.agregarDatos(userPath, new User(email, password, username, admin));
	}
}
