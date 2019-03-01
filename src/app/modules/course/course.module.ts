import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { UiModule } from '../../core/ui/ui.module';

import {
	CourseFormComponent,
	CourseItemComponent,
	CourseListComponent,
	CourseSearchComponent,
	SortedItemComponent,
} from './components';

import {
	ItemRatedLightDirective,
	ItemStatusLightDirective,
} from './directives';

import {
	SortedByPipe,
	ItemDurationPipe,
	FilterByQueryPipe,
} from './pipes';

import {
	CourseService
} from './services';

const angularDeclaration = [
	CourseFormComponent,
	CourseItemComponent,
	CourseListComponent,
	SortedItemComponent,
	CourseSearchComponent,

	ItemRatedLightDirective,
	ItemStatusLightDirective,

	SortedByPipe,
	ItemDurationPipe,
	FilterByQueryPipe,
];

@NgModule({
	imports: [
		CommonModule,
		UiModule,
		FormsModule,
		FontAwesomeModule,
	],
	declarations: angularDeclaration,
	exports: angularDeclaration
})
export class CourseListModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CourseListModule,
			providers: [
				CourseService,
			],
		};
	}
}
