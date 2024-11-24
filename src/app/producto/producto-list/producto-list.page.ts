import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importar el plugin para tablas


@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage implements OnInit {
  products: any[] = [];

  constructor(private firestore: AngularFirestore, private router: Router,private toastCtrl: ToastController, private alertController: AlertController) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.firestore
      .collection('products')
      .snapshotChanges()
      .subscribe((data) => {
        this.products = data.map((doc) => {
          return { id: doc.payload.doc.id, ...(doc.payload.doc.data() as object) };
        });
      });
  }

  async deleteProduct(id: string) {
    // Muestra una alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Si se confirma, elimina el producto
            this.firestore
              .collection('products')
              .doc(id)
              .delete()
              .then(() => {
                console.log('Producto eliminado con éxito');
              })
              .catch((error) => {
                console.error('Error al eliminar el producto: ', error);
              });
          },
        },
      ],
    });

    // Presenta la alerta al usuario
    await alert.present();
  }

 editProduct(product: any) {
  // Navega a la página de edición pasando el ID del producto como parámetro
  console.log('Navegando a la edición del producto:', product); // Para depurar
  this.router.navigate(['producto-edit', product.id]);
}

  goBackToMenu() {
    this.router.navigate(['/producto']);
  }

  exportToPDF() {
    const pdf = new jsPDF(); // Crear instancia de jsPDF
  
    // Título del documento
    pdf.setFontSize(18);
    pdf.text('Lista de Productos', 14, 20);
  
    // Configurar encabezados de la tabla
    const headers = ['ID', 'Categoría', 'Nombre', 'Stock'];
  
    // Crear filas con los datos de productos
    const rows = this.products.map(product => [
      product.barcode,
      product.category,
      product.name,
      product.stock
    ]);
  
    // Dibujar la tabla en el PDF
    (pdf as any).autoTable({
      head: [headers],
      body: rows,
      startY: 30, // La tabla inicia en la posición Y=30
    });
  
    // Descargar el archivo PDF
    pdf.save('productos.pdf');
  }
  
 // Método para mostrar un toast
 async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 2000,
  });
  await toast.present();
}

  // Método ficticio para logout, si no es necesario puedes eliminarlo
  logout() {
    this.presentToast('Logout');
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/home']); // Reemplaza '/home' por la ruta correspondiente a tu menú principal
  }
}
