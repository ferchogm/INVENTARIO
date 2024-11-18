import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockEntradaPage } from './stock-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: StockEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockEntradaPageRoutingModule {}
