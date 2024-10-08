import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(private router: Router) {}

    onLogout() {
      // Aquí puedes realizar la lógica para cerrar sesión
      // Por ejemplo, eliminar tokens de autenticación o información de usuario. 
  
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    }

    goBackToMenu() {
      this.router.navigate(['/home']);
    }

  ngOnInit() {
  }

}
