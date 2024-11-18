import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-stock-entrada',
  templateUrl: './stock-entrada.page.html',
  styleUrls: ['./stock-entrada.page.scss'],
})
export class StockEntradaPage {
  barcode: string = ''; // Código de barras o ID del producto
  product: any = null; // Producto consultado
  quantityToAdd: number | null = null; // Cantidad a incrementar

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  // Método para escanear el código de barras
  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
    }).catch(err => {
      this.presentToast('Error al escanear el código de barras: ' + err);
    });
  }

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

  // Método para incrementar el stock del producto
  addStock() {
    if (!this.product || this.quantityToAdd === null || this.quantityToAdd <= 0) {
      this.presentToast('Por favor complete el formulario correctamente.');
      return;
    }

    const newStock = this.product.stock + this.quantityToAdd;

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

  // Método ficticio para logout, si no es necesario puedes eliminarlo
  logout() {
    this.presentToast('Logout');
    this.router.navigate(['/login']);
  }
}
