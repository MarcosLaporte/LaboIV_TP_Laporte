import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import { DatabaseService } from '../database.service';
import { Score } from 'src/app/classes/score';
import { getUserInSession } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	constructor(private dbService: DatabaseService) { }

	async gameOver(scoreObj: Score, options: SweetAlertOptions): Promise<boolean> {
		let newGame = false;
			this.dbService.agregarDatos('scores', scoreObj);

		await Swal.fire({
			icon: options.icon,
			title: options.title,
			text: options.text,
			confirmButtonText: 'New game',
			showCancelButton: true,
			cancelButtonText: 'Home',
			allowEscapeKey: false,
			allowOutsideClick: false
		}).then((res) => {
			newGame = res.isConfirmed;
		});

		return newGame;
	}
}
