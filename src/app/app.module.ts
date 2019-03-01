import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './modules/auth/auth.module';
import { HistoryService } from './modules/routers/history.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		AuthModule.forRoot(),
		PagesModule,
	],
	providers: [
		HistoryService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
