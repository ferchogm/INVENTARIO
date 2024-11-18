import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockSalidaPageRoutingModule } from './stock-salida-routing.module';

import { StockSalidaPage } from './stock-salida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockSalidaPageRoutingModule
  ],
  declarations: [StockSalidaPage]
})
export class StockSalidaPageModule {}
