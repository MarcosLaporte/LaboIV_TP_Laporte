import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
	{ path: 'login-component', component: LoginComponent },
	{ path: 'signup-component', component: SignupComponent },
	{ path: '', component: HomeComponent },
	{ path: 'home-component', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
