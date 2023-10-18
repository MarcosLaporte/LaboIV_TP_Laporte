import { Component } from '@angular/core';
import { Message } from '../classes/message';
import { User } from '../classes/user';
import { AccountService } from '../services/account.service';
import { DatabaseService } from '../services/database.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: [DatePipe]
})
export class ChatComponent {
	messages: Array<Message> = [];
	userInSession: User | undefined;
	msgText: string = "";

	constructor(private accService: AccountService, private dbService: DatabaseService) {}

	ngOnInit() {
		this.userInSession = this.accService.getUserInSession();
		this.dbService.traerNuevosMensajes(this.messages);
	}
	
	usrMsgStyle(user: User) {
		return user.email === this.userInSession?.email ? 'background-color: #48b0f7; color: #fff;' : '';
	}

	sendMessage() {
		if (this.userInSession && this.msgText !== ""){
			const msg = new Message(this.userInSession, this.msgText);
			this.dbService.agregarDatos('messages', msg);
			this.msgText = "";
		}
	}

	keyPress($event: any) {
		console.log($event);
		
		if ($event.key === 'Enter')
			this.sendMessage();
	}

	updateMessages() {

	}
}
