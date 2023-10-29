import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const notLoggedGuard: CanActivateFn = (route, state) => {
	return !inject(AuthService).isLogged;
};