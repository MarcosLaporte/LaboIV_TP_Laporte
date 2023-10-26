import { Component } from '@angular/core';
import { getUserInSession } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor() {}
	title = 'TP_Laporte';

	getUser(){
		return getUserInSession();
	}
}
