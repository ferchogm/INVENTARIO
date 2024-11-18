import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockEntradaPage } from './stock-entrada.page';

describe('StockEntradaPage', () => {
  let component: StockEntradaPage;
  let fixture: ComponentFixture<StockEntradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEntradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
