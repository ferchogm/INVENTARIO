
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss'],
})
export class ProductoAddPage implements OnInit  {
  product = {
    barcode: '',
    name: '',
    category: '',
    stock: null
  };

  categories: any[] = []; // Arreglo para almacenar las categorías

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadCategories(); // Cargar categorías cuando se inicia la página
  }

    // Método para cargar todas las categorías de la base de datos
    loadCategories() {
      this.firestore.collection('categories').snapshotChanges().subscribe(data => {
        this.categories = data.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as any
        }));
      });
    }

  // Método para escanear el código de barras usando el escáner
  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.product.barcode = barcodeData.text;  // Se asigna al objeto product
    }).catch(err => {
      this.presentToast('Error al escanear el código de barras: ' + err);
    });
  }

  // Método para adicionar un producto a la base de datos
  addProduct() {
    const { barcode, name, category, stock } = this.product;
    
    if (barcode && name && category && stock !== null) {
      this.firestore.collection('products').add({
        barcode: barcode,
        name: name,
        category: category,
        stock: stock
      }).then(() => {
        this.presentToast('Producto añadido con éxito');
        this.clearForm();
      }).catch(err => {
        this.presentToast('Error al añadir el producto: ' + err);
      });
    } else {
      this.presentToast('Por favor complete todos los campos');
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

  // Método para limpiar el formulario después de agregar un producto
  clearForm() {
    this.product = {
      barcode: '',
      name: '',
      category: '',
      stock: null
    };
  }

  // Método ficticio para logout, si no es necesario puedes eliminarlo
  logout() {
    this.presentToast('Logout');
  }
}
