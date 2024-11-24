import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioPageModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule),
  },
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.module').then(m => m.StockPageModule),
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then(m => m.ProductoPageModule),
  },

  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  },

  {
    path: 'stock-entrada',
    loadChildren: () => import('./stock/stock-entrada/stock-entrada.module').then(m => m.StockEntradaPageModule)
  }, 
  
  {
    path: 'stock-salida',
    loadChildren: () => import('./stock/stock-salida/stock-salida.module').then(m => m.StockSalidaPageModule)
  },

  { path: 'producto-add', loadChildren: () => import('./producto/producto-add/producto-add.module').then(m => m.ProductoAddPageModule) }, 
  { path: 'producto-delete', loadChildren: () => import('./producto/producto-delete/producto-delete.module').then(m => m.ProductoDeletePageModule) },

  {
    path: 'producto-edit/:id',
    loadChildren: () =>
      import('./producto/producto-edit/producto-edit.module').then(
        (m) => m.ProductoEditPageModule
      ),
  },
  {
    path: 'producto-list',
    loadChildren: () => import('./producto/producto-list/producto-list.module').then(m => m.ProductoListPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
