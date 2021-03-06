import * as uuid from 'uuid/v4';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModel } from 'src/app/shared/models';
import { CourseService } from '../../services';
import { CourseListComponent } from './course-list.component';
import { FilterByQueryPipe, SortedByPipe } from '../../pipes';
import { InputResultModel } from 'src/app/shared/models/input-result.model';

const dummyData = {
	title: 'Dummy title',
	icons: new Map([
		['plus', faTrash ]
	]),
	items: [
		new CourseModel(uuid(), 'Dummy title 1'),
		new CourseModel(uuid(), 'Dummy title 2'),
	],
	moreText: 'Dummy more',
};
@Component({
	template: `
		<app-course-list
			[title]="title"
			[icons]="icons"
			[loadMoreText]="loadMoreText"
		></app-course-list>
	`,
})
class TestHostComponent {
	public title: string = dummyData.title;
	public icons: Map<string, IconDefinition> = dummyData.icons;
	public loadMoreText: string = dummyData.moreText;
}
describe('CourseListComponent', () => {
	let serviceObj;

	beforeEach(async(() => {
		serviceObj = jasmine.createSpyObj('CourseService', ['read', 'delete', 'update', 'create']);
		serviceObj.read.and.returnValue(dummyData.items);

		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				FontAwesomeModule
			],
			declarations: [
				TestHostComponent,
				CourseListComponent,
				FilterByQueryPipe,
				SortedByPipe,
			],
			providers: [
				{ provide: CourseService, useValue: serviceObj }
			],
			schemas: [ NO_ERRORS_SCHEMA ],
		})
		.compileComponents();
	}));

	describe('Component Alone', () => {
		let component: CourseListComponent;
		let fixture: ComponentFixture<CourseListComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(CourseListComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should have default properties', () => {
			// Arrange
			const selectorTitle = '.course-list__title';
			const resultTitle = 'Find or add angular courses ...';

			// Act
			const nativeElement = fixture.debugElement.nativeElement;
			const titleElement = nativeElement.querySelector(selectorTitle);

			// Assert
			expect(titleElement.textContent).toBe(resultTitle);
		});

		it('should get courses list', () => {
			// Assert
			expect(serviceObj.read.calls.any()).toBe(true);
		});
		it('should load more', () => {
			// Arrange
			const outputData = dummyData.items.concat(dummyData.items);

			// Act
			component.onLoadMore();

			// Assert
			expect(component.courses).toEqual(outputData);
		});
		it('should remove item', () => {
			// Arrange
			const removeItem = dummyData.items[0];

			// Act
			component.onRemoveItem(removeItem.id);

			// Assert
			expect(serviceObj.delete.calls.any()).toBe(true);
		});

		it('should edit an item by exist id', () => {
			// Arrange
			const editItem = dummyData.items[0];

			// Act
			component.onEditItem(editItem.id);

			// Assert
			expect(serviceObj.update.calls.any()).toBe(true);
		});

		it('should doesn\'t edit an item if item with input id does not exist', () => {
			// Arrange
			const falseId = '100';

			// Act
			component.onEditItem(falseId);

			// Assert
			expect(serviceObj.update).not.toHaveBeenCalled();
		});

		it('should add item', () => {
			// Act
			component.onAdd();

			// Assert
			expect(serviceObj.create.calls.any()).toBe(true);
		});

		it('should search item', () => {
			// Arrange
			const inputQuery: InputResultModel = new InputResultModel('name', '1');
			const outputCount = 1;
			const itemsSelector = '.block-course-list';
			component.courses = dummyData.items;

			// Act
			component.onSearchItem(inputQuery);
			const items = fixture.nativeElement.querySelector(itemsSelector);
			fixture.detectChanges();

			// Assert
			expect(items.children.length).toEqual(outputCount);
		});
	});
	describe('Test Host Component', () => {
		let component: TestHostComponent;
		let fixture: ComponentFixture<TestHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(TestHostComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should change default properties', () => {
			// Arrange
			const selectorTitle = '.course-list__title';
			const resultTitle =  dummyData.title;

			// Act
			const nativeElement = fixture.debugElement.nativeElement;
			const titleElement = nativeElement.querySelector(selectorTitle);

			// Assert
			expect(titleElement.textContent).toBe(resultTitle);
		});
	});
});
