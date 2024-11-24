import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoPage } from './producto.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoPage
  },
  {
    path: 'producto-add',
    loadChildren: () => import('./producto-add/producto-add.module').then( m => m.ProductoAddPageModule)
  },
  {
    path: 'producto-delete',
    loadChildren: () => import('./producto-delete/producto-delete.module').then( m => m.ProductoDeletePageModule)
  },
  {
    path: 'producto-list',
    loadChildren: () => import('./producto-list/producto-list.module').then( m => m.ProductoListPageModule)
  },  {
    path: 'producto-edit',
    loadChildren: () => import('./producto-edit/producto-edit.module').then( m => m.ProductoEditPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoPageRoutingModule {}
