import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesremovePage } from './categoriesremove.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesremovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesremovePageRoutingModule {}
