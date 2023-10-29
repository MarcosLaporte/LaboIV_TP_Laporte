import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { AccountComponent } from './components/account/account.component';
import { SurveyComponent } from './components/survey/survey.component';
import { loggedGuard } from './guards/logged.guard';
import { notLoggedGuard } from './guards/not-logged.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{ path: 'home', component: HomeComponent },
	{
		path: 'login',
		canActivate: [notLoggedGuard],
		component: LoginComponent
	},
	{
		path: 'signup',
		canActivate: [notLoggedGuard],
		component: SignupComponent
	},
	{ path: 'about', component: AboutComponent },
	{
		path: 'account',
		canActivate: [loggedGuard],
		component: AccountComponent,
	},
	{
		path: 'games',
		canActivateChild: [loggedGuard],
		loadChildren: () => import('./games-module/games.module').then(m => m.GamesModule)
	},
	{
		path: 'survey',
		canActivate: [loggedGuard],
		component: SurveyComponent
	},
	{ path: '**', component: ErrorComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
