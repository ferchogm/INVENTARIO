import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage {

  constructor(private router: Router) {}

  // Método para regresar al menú principal
  goBackToMenu() {
    this.router.navigate(['/home']);
  }

  // Método para ir a la página de Stock
  goToStock() {
    this.router.navigate(['/stock']);
  }

  // Método para ir a la página de Productos
  goToProducts() {
    this.router.navigate(['/producto']);
  }

  // Método para ir a la página de Reportes
  goToReports() {
    this.router.navigate(['/reportes']);
  }

  onLogout() {
    // Aquí puedes realizar la lógica para cerrar sesión
    // Por ejemplo, eliminar tokens de autenticación o información de usuario.

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
