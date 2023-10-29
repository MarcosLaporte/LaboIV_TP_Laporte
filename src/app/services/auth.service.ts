import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { DatabaseService } from './database.service';
import Swal from 'sweetalert2';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth'
import { BehaviorSubject } from 'rxjs';
const userPath = 'users';

@Injectable({
	providedIn: 'root'
})

@Injectable()
export class AuthService {
	//#region Subjects & Observables
	private _isLoggedSub = new BehaviorSubject<boolean>(false);
	public isLoggedObs = this._isLoggedSub.asObservable();
	public get isLogged() {
		return this._isLoggedSub.getValue();
	}
	public set isLogged(value: boolean) {
		this._isLoggedSub.next(value);
	}

	private _isAdminSub = new BehaviorSubject<boolean>(false);
	public isAdminObs = this._isAdminSub.asObservable();
	public get isAdmin() {
		return this._isAdminSub.getValue();
	}
	public set isAdmin(value: boolean) {
		this._isAdminSub.next(value);
	}

	private _loggedUserSub = new BehaviorSubject<User | undefined>(undefined);
	public loggedUserObs = this._loggedUserSub.asObservable();
	public get loggedUser() {
		return this._loggedUserSub.getValue();
	}
	public set loggedUser(value: User | undefined) {
		this._loggedUserSub.next(value);
	}
	//#endregion

	constructor(private dbService: DatabaseService) {
		this.isLogged = false;
		this.loggedUser = undefined;
		this.isAdmin = false;
	}

	logOutFromSession() {
		this.isLogged = false;
		this.loggedUser = undefined;
		this.isAdmin = false;
	}

	async signIn(email: string, pass: string) {
		const user = await this.searchUser(email, pass);
		if (user === null) {
			Swal.fire('Oops...', 'Sorry, your data was incorrect. Check again.', 'error');
			return false;
		}

		this.dbService.agregarDatos('logs', { email: email, admin: user.admin, log: new Date() });

		this.isLogged = true;
		this.loggedUser = user;
		this.isAdmin = user.admin;
		return true;
	}

	private async searchUser(email: string, password: string) {
		if (await this.emailExists(email)) {
			const arrayUsers = await this.dbService.traerDatos<User>(userPath);
			for (const user of arrayUsers) {
				if (user.email == email && user.password == password)
					return user;
			}
		}

		return null;
	}

	private async emailExists(email: string): Promise<boolean> {
		const arrayUsers = await this.dbService.traerDatos<User>(userPath);
		return arrayUsers.some((u) => u.email === email);

	}

	async usernameExists(username: string): Promise<boolean> {
		const arrayUsers = await this.dbService.traerDatos<User>(userPath);
		return arrayUsers.some((u) => u.username === username);
	}

	saveUser(email: string, password: string, username: string, admin: boolean) {
		const fireAuth = getAuth();
		createUserWithEmailAndPassword(fireAuth, email, password);
		this.dbService.agregarDatos(userPath, new User(email, password, username, admin));
	}
}
