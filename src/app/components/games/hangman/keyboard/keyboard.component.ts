import { Component, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent {
	@Output() keyEvent = new EventEmitter<string>();
	@Input() newGame: boolean = false;
	disabledKeys: Array<string> = [];

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['newGame'])
			this.disabledKeys = [];
	}

	onKeyPress(key: string) {
		this.disabledKeys.push(key);
		this.keyEvent.emit(key);
	}
}
