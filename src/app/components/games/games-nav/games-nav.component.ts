import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-games-nav',
  templateUrl: './games-nav.component.html',
  styleUrls: ['./games-nav.component.css']
})
export class GamesNavComponent {
	@Input() score: number = 0;
	@Output() newGameEvent = new EventEmitter<any>();

	newGame() {
		this.newGameEvent.emit();
	}
}
