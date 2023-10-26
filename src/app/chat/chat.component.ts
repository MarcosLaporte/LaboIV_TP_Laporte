import { Component } from '@angular/core';
import { Message } from '../classes/message';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';
import { DatePipe } from '@angular/common';
import { getUserInSession } from 'src/environments/environment';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: [DatePipe]
})
export class ChatComponent {
	messages: Array<Message> = [];
	msgText: string = "";

	constructor(private dbService: DatabaseService) { }

	ngOnInit() {
		this.dbService.traerNuevosMensajes(this.messages);
	}

	usrMsgStyle(user: User) {
		const tmpUser = getUserInSession();
		return user.email === tmpUser?.email ? 'background-color: #48b0f7; color: #fff;' : '';
	}

	sendMessage() {
		const tmpUser = getUserInSession();
		if (tmpUser && this.msgText !== "") {
			const msg = new Message(tmpUser, this.msgText);
			this.dbService.agregarDatos('messages', msg);
			this.msgText = "";
		}
	}

	keyPress($event: any) {
		if ($event.key === 'Enter')
			this.sendMessage();
	}
}
