import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesaddPageRoutingModule } from './categoriesadd-routing.module';

import { CategoriesaddPage } from './categoriesadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesaddPageRoutingModule
  ],
  declarations: [CategoriesaddPage]
})
export class CategoriesaddPageModule {}
