import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { AccountComponent } from './components/account/account.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { GamesModule } from './games-module/games.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent,
		AboutComponent,
		ErrorComponent,
		AccountComponent,
		ChatComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
		GamesModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
