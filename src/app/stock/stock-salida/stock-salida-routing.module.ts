import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockSalidaPage } from './stock-salida.page';

const routes: Routes = [
  {
    path: '',
    component: StockSalidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockSalidaPageRoutingModule {}
