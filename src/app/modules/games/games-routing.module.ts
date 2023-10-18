import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from 'src/app/components/games/hangman/hangman.component';
import { HomeComponent } from 'src/app/components/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'hangman', component: HangmanComponent},
	// { path: 'hi-lo', component: HighLowComponent},
	// { path: 'trivia', component: triviaComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GamesRoutingModule { }
