import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockEntradaPageRoutingModule } from './stock-entrada-routing.module';

import { StockEntradaPage } from './stock-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockEntradaPageRoutingModule
  ],
  declarations: [StockEntradaPage]
})
export class StockEntradaPageModule {}
