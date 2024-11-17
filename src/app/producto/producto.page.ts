import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage {

  constructor(private router: Router) {}

  // Navegar a la página de agregar producto
  addProduct() {
    this.router.navigate(['/producto-add']);
    // Aquí puedes agregar la lógica para abrir la página de agregar productos
  }

  // Eliminar producto
  deleteProduct() {
    console.log("Navegando a la página de eliminar producto");
    // Aquí puedes agregar la lógica para abrir la página de eliminar productos
  }

  // Consultar producto
  consultProduct() {
    this.router.navigate(['/producto-list']);
    // Aquí puedes agregar la lógica para abrir la página de consultar productos
  }

  // Regresar a la página de inventarios
  goBackToInventario() {
    this.router.navigate(['/inventario']);
  }

  // Cerrar sesión
  logout() {
    console.log("Cerrando sesión");
    // Aquí va la lógica para cerrar sesión
  }
}
