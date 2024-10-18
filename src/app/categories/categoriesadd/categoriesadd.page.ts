import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoriesadd',
  templateUrl: './categoriesadd.page.html',
  styleUrls: ['./categoriesadd.page.scss'],
})
export class CategoriesaddPage implements OnInit {
  newCategoryName: string = '';
  constructor(private router: Router) {}

  onLogout() {
    // Aquí puedes realizar la lógica para cerrar sesión - PRUEBA DE GIT
    // Por ejemplo, eliminar tokens de autenticación o información de usuario. 

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  goBackToMenu() {
    this.router.navigate(['/categories']);
  }

  addCategory() {
    
    if (this.newCategoryName.trim().length === 0) {
      this.router.navigate(['/error'], { queryParams: { message: 'El nombre de la categoría no puede estar vacío' } });
      return;
    }

    try {
      //
      // await this.categoryService.addCategory(this.newCategoryName);

      this.router.navigate(['/success'], { queryParams: { message: 'Categoría creada correctamente' } });
      this.newCategoryName = '';
    } catch (error) {
      this.router.navigate(['/error'], { queryParams: { message: 'Error al crear la categoría' } });
    }
  }
ngOnInit() {
}

}
