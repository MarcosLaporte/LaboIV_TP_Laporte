import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent {
	username: string = "";
	email: string = "";

	constructor(private router: Router, private auth: AuthService) {
		const loggedUser = auth.loggedUser;
		if (loggedUser !== undefined) {
			this.username = loggedUser ? loggedUser.username : "USERNAME_NOT_FOUND";
			this.email = loggedUser ? loggedUser.email : "EMAIL_ADD_NOT_FOUND";
		}
	}

	signOut() {
		Swal.fire({
			title: 'Do you want to log out?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
			showLoaderOnConfirm: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Logged out!', '', 'success');
				this.auth.logOutFromSession();
				this.router.navigateByUrl('home');
			}
		});

	}
}
