import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
	providedIn: 'root'
})

@Injectable()
export class AuthService {
	isLogged: boolean;
	isAdmin: boolean;

	constructor() {
		const user: User | undefined = this.getUserInSession();

		this.isLogged = user !== undefined;
		this.isAdmin = user !== undefined ? user.admin : false;
	}

	getUserInSession(): User | undefined {
		const ss = sessionStorage.getItem('loggedUser');
		if (ss !== null)
			return JSON.parse(ss) as User;

		return undefined;
	}
}
