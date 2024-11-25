import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-producto-delete',
  templateUrl: './producto-delete.page.html',
  styleUrls: ['./producto-delete.page.scss'],
})
export class ProductoDeletePage {
  barcode: string = '';

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  
  async deleteProduct() {
    if (this.barcode) {
      const productSnapshot = await this.firestore.collection('products', ref => ref.where('barcode', '==', this.barcode)).get().toPromise();
      
      // Verificamos que productSnapshot no sea undefined ni esté vacío
      if (productSnapshot && !productSnapshot.empty) {
        // Eliminamos el primer documento que coincida
        productSnapshot.docs[0].ref.delete();
        this.showAlert('Producto eliminado con éxito');
      } else {
        this.showAlert('Producto no encontrado');
      }
    } else {
      this.showAlert('Por favor, escanee el código QR del producto.');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
