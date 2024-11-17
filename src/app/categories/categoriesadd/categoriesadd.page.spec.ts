import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesaddPage } from './categoriesadd.page';

describe('CategoriesaddPage', () => {
  let component: CategoriesaddPage;
  let fixture: ComponentFixture<CategoriesaddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
