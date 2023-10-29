import { Component } from '@angular/core';
import { Message } from '../classes/message';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: [DatePipe]
})
export class ChatComponent {
	messages: Array<Message> = [];
	msgText: string = "";

	constructor(private dbService: DatabaseService, private auth: AuthService) { }

	ngOnInit() {
		this.dbService.traerNuevosMensajes(this.messages);
	}

	usrMsgStyle(msgUser: User) {
		return msgUser.email === this.auth.loggedUser?.email ? 'background-color: #48b0f7; color: #fff;' : '';
	}

	sendMessage() {
		if (this.auth.loggedUser && this.msgText !== "") {
			const msg = new Message(this.auth.loggedUser, this.msgText);
			this.dbService.agregarDatos('messages', msg);
			this.msgText = "";
		}
	}

	keyPress($event: any) {
		if ($event.key === 'Enter')
			this.sendMessage();
	}
}
