import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockSalidaPage } from './stock-salida.page';

describe('StockSalidaPage', () => {
  let component: StockSalidaPage;
  let fixture: ComponentFixture<StockSalidaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSalidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
