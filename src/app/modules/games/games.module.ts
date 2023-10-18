import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { HangmanComponent } from '../../components/games/hangman/hangman.component';
import { FormsModule } from '@angular/forms';
import { KeyboardComponent } from 'src/app/components/games/hangman/keyboard/keyboard.component';


@NgModule({
  declarations: [
    GamesComponent,
    HangmanComponent,
		KeyboardComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
		FormsModule
  ],
	exports: [
		GamesComponent
	]
})
export class GamesModule { }
