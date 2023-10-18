import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class KeyboardComponent {
	@Output() keyEvent = new EventEmitter<string>();
	disabledKeys: Array<string> = [];

	onKeyPress(key: string) {
		this.disabledKeys.push(key);
		this.keyEvent.emit(key);
	}
}
