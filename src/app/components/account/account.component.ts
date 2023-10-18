import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent {
	username: string = "";
	email: string = "";

	constructor(private router: Router, private accService: AccountService) { }

	ngOnInit() {
		let usrAux = "USERNAME_NOT_FOUND";
		let emAux = "EMAIL_ADD_NOT_FOUND";
		const tmpUser = this.accService.getUserInSession();
		if (tmpUser !== undefined) {
			usrAux = tmpUser.username;
			emAux = tmpUser.email;
		}

		this.username = usrAux;
		this.email = emAux;
	}

	signOut() {
		Swal.fire({
			title: 'Do you want to log out?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
			showLoaderOnConfirm: true,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Logged out!', '', 'success');
				this.accService.logOutFromSession();
				this.router.navigate(['/home']);
			}
		});

	}
}
