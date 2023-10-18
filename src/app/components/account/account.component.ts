import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
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
		let usrname = "USERNAME_NOT_FOUND";
		let email = "EMAIL_ADD_NOT_FOUND";
		const ssUser = this.accService.getUserInSession();
		if (ssUser !== undefined) {
			usrname = ssUser.username;
			email = ssUser.email;
		}

		this.username = usrname;
		this.email = email;
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
				Swal.fire('Logged out!', '', 'success')
				sessionStorage.removeItem('loggedUser');
				this.router.navigate(['/home']);
			}
		});

	}
}
