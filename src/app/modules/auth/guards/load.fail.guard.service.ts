import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route } from '@angular/router';

import { AuthService } from '../services';
import { HistoryService } from '../../routers/history.service';

@Injectable({
	providedIn: 'root'
})
export class LoadFailGuardService implements CanLoad {
	private redirectPageUrl: string = '/';

	constructor(
		private hostoryService: HistoryService,
		private authService: AuthService,
	) { }

	public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		const isAuth = this.authService.isAuth;
		if (!isAuth) {
			return true;
		}

		this.hostoryService.goTo(this.redirectPageUrl);
		return false;
	}
}
