import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { HangmanComponent } from '../components/games/hangman/hangman.component';
import { FormsModule } from '@angular/forms';
import { KeyboardComponent } from 'src/app/components/games/hangman/keyboard/keyboard.component';
import { HiOrLoComponent } from 'src/app/components/games/hi-or-lo/hi-or-lo.component';
import { TriviaComponent } from 'src/app/components/games/trivia/trivia.component';
import { GamesNavComponent } from 'src/app/components/games/games-nav/games-nav.component';
import { ColorTestComponent } from 'src/app/components/games/color-test/color-test.component';

@NgModule({
	declarations: [
		GamesComponent,
		HangmanComponent,
		KeyboardComponent,
		HiOrLoComponent,
		TriviaComponent,
		GamesNavComponent,
		ColorTestComponent,
	],
	imports: [
		CommonModule,
		GamesRoutingModule,
		FormsModule,
	],
	exports: [
		GamesComponent
	]
})
export class GamesModule { }
