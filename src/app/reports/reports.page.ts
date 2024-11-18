import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage {
  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  // Método para generar el reporte de productos
  async generateProductReport() {
    try {
      const querySnapshot = await this.firestore.collection('products').get().toPromise();
      if (querySnapshot) {
        const products = querySnapshot.docs.map(doc => doc.data() as { barcode: string; category: string; name: string; stock: number });

        const doc = new jsPDF();
        doc.text('Reporte de Productos', 14, 10);

        autoTable(doc, {
          head: [['Código', 'Categoría', 'Nombre', 'Stock']],
          body: products.map(product => [
            product.barcode,
            product.category,
            product.name,
            product.stock,
          ]),
        });

        doc.save('reporte_productos.pdf');
        this.presentToast('Reporte de productos generado con éxito.');
      }
    } catch (error: any) {
      this.presentToast('Error al generar el reporte de productos: ' + (error.message || error));
    }
  }

  // Método para generar el reporte de categorías
  async generateCategoryReport() {
    try {
      const querySnapshot = await this.firestore.collection('categories').get().toPromise();
      if (querySnapshot) {
        const categories = querySnapshot.docs.map(doc => doc.data() as { createdAt: string; name: string });

        const doc = new jsPDF();
        doc.text('Reporte de Categorías', 14, 10);

        autoTable(doc, {
          head: [['Fecha de Creación', 'Nombre']],
          body: categories.map(category => [
            this.formatDate(category['createdAt']),
            category.name,
          ]),
        });

        doc.save('reporte_categorias.pdf');
        this.presentToast('Reporte de categorías generado con éxito.');
      }
    } catch (error: any) {
      this.presentToast('Error al generar el reporte de categorías: ' + (error.message || error));
    }
  }

  // Método para formatear la fecha
private formatDate(timestamp: any): string {
  if (!timestamp) return 'Sin fecha'; // Manejo de errores si el campo está vacío
  const date = new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp); // Manejar Firestore Timestamp
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

  // Método para generar el reporte de usuarios
  async generateUserReport() {
    try {
      const querySnapshot = await this.firestore.collection('users').get().toPromise();
      if (querySnapshot) {
        const users = querySnapshot.docs.map(doc => doc.data() as { name: string; email: string; username: string; rol: string });

        const doc = new jsPDF();
        doc.text('Reporte de Usuarios', 14, 10);

        autoTable(doc, {
          head: [['Nombre', 'Correo Electrónico', 'Usuario', 'Rol']],
          body: users.map(user => [
            user.name,
            user.email,
            user.username,
            user.rol,
          ]),
        });

        doc.save('reporte_usuarios.pdf');
        this.presentToast('Reporte de usuarios generado con éxito.');
      }
    } catch (error: any) {
      this.presentToast('Error al generar el reporte de usuarios: ' + (error.message || error));
    }
  }

  // Método para mostrar un toast
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    await toast.present();
  }

  // Método para regresar al menú principal
  goBackToHome() {
    this.router.navigate(['/home']);
  }

  // Método ficticio para logout, si no es necesario puedes eliminarlo
  logout() {
    this.presentToast('Logout');
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/home']); // Reemplaza '/home' por la ruta correspondiente a tu menú principal
  }

  goBackToMenu() {
    this.router.navigate(['/producto']);
  }

}


