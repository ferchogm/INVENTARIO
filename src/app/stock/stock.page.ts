import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router


@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(private router: Router) {}

   // Navegar a la página de agregar producto
   stockExit() {
    this.router.navigate(['/stock-salida']);
    // Aquí puedes agregar la lógica para abrir la página de agregar productos
  }

 

  // Consultar producto
  stockEntry() {
    this.router.navigate(['/stock-entrada']);
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

  ngOnInit(): void {
    // Implementación inicial
  }
}
