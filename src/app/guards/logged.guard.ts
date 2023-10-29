import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
	return inject(AuthService).isLogged;
};