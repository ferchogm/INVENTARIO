import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-stock-salida',
  templateUrl: './stock-salida.page.html',
  styleUrls: ['./stock-salida.page.scss'],
})
export class StockSalidaPage {
  barcode: string = ''; // Código de barras o ID del producto
  product: any = null; // Producto consultado
  quantityToAdd: number | null = null; // Cantidad a decrementar

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

 

  // Método para consultar el producto en la base de datos
  consultProduct() {
    if (this.barcode.trim() === '') {
      this.presentToast('Por favor ingrese o escanee el ID del producto.');
      return;
    }

    this.firestore
      .collection('products', ref => ref.where('barcode', '==', this.barcode))
      .get()
      .subscribe(querySnapshot => {
        if (!querySnapshot.empty) {
          this.product = querySnapshot.docs[0].data();
          this.product.id = querySnapshot.docs[0].id; // Guardar ID para actualizaciones
        } else {
          this.presentToast('Producto no encontrado en la base de datos.');
          this.product = null;
        }
      });
  }

  // Método para disminuir el stock del producto
  addStock() {
    if (!this.product || this.quantityToAdd === null || this.quantityToAdd <= 0) {
      this.presentToast('Por favor complete el formulario correctamente.');
      return;
    }

    // Validar que el stock restante no sea menor a 0
    if (this.quantityToAdd > this.product.stock) {
      this.presentToast(
        `No se puede disminuir el stock. La cantidad a retirar (${this.quantityToAdd}) supera el stock disponible (${this.product.stock}).`
      );
      return;
    }

    const newStock = this.product.stock - this.quantityToAdd;

    this.firestore
      .collection('products')
      .doc(this.product.id)
      .update({ stock: newStock })
      .then(() => {
        this.presentToast('Stock actualizado con éxito.');
        this.product = null;
        this.barcode = '';
        this.quantityToAdd = null;
      })
      .catch(err => {
        this.presentToast('Error al actualizar el stock: ' + err);
      });
  }

  // Método para mostrar un toast
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    await toast.present();
  }

  // Regresar a la página de inventarios
  goBackToInventario() {
    this.router.navigate(['/stock']);
  }

  // Cerrar sesión
  logout() {
    console.log("Cerrando sesión");
    // Aquí va la lógica para cerrar sesión
  }

  goToHome() {
    this.router.navigate(['/home']); // Reemplaza '/home' por la ruta correspondiente a tu menú principal
  }
}
