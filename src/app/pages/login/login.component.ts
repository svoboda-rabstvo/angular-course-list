import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { Config } from 'src/app/shared';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public username: string;
	public password: string;

	public icons: Map<string, IconDefinition> = Config.icons;

	constructor(private authService: AuthService) { }

	public onSubmit(): void {
		this.authService.Login(this.username, this.password);
	}
}
