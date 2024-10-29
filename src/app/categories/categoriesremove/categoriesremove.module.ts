import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesremovePageRoutingModule } from './categoriesremove-routing.module';

import { CategoriesremovePage } from './categoriesremove.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesremovePageRoutingModule
  ],
  declarations: [CategoriesremovePage]
})
export class CategoriesremovePageModule {}
