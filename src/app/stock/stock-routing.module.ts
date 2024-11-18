import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockPage } from './stock.page';

const routes: Routes = [
  {
    path: '',
    component: StockPage
  },  {
    path: 'stock-entrada',
    loadChildren: () => import('./stock-entrada/stock-entrada.module').then( m => m.StockEntradaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockPageRoutingModule {}
