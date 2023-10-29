import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
	return inject(AuthService).isAdmin;
};
