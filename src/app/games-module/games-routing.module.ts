import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorTestComponent } from 'src/app/components/games/color-test/color-test.component';
import { HangmanComponent } from 'src/app/components/games/hangman/hangman.component';
import { HiOrLoComponent } from 'src/app/components/games/hi-or-lo/hi-or-lo.component';
import { TriviaComponent } from 'src/app/components/games/trivia/trivia.component';
import { HomeComponent } from 'src/app/components/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'hangman', component: HangmanComponent },
	{ path: 'hi-lo', component: HiOrLoComponent },
	{ path: 'trivia', component: TriviaComponent },
	{ path: 'color-test', component: ColorTestComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GamesRoutingModule { }
