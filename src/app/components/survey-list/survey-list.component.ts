import { Component } from '@angular/core';
import { Survey } from 'src/app/classes/survey';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
	list: Array<Survey> = [];

	constructor(private dbService: DatabaseService) { }
	
	async ngOnInit() {
		this.list = await this.dbService.traerDatos<Survey>('surveys');
	}
}
