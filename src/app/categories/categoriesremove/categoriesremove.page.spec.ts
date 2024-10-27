import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesremovePage } from './categoriesremove.page';

describe('CategoriesremovePage', () => {
  let component: CategoriesremovePage;
  let fixture: ComponentFixture<CategoriesremovePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesremovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
