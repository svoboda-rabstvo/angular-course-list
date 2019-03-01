import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(
		private authService: AuthService,
	) { }

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.authService.isAuth;
	}
}
