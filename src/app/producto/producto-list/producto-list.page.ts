import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage implements OnInit {
  products: any[] = [];

  constructor(private firestore: AngularFirestore, private router: Router) {}

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

  deleteProduct(id: string) {
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
  }

  editProduct(product: any) {
    // Navega a la página de edición pasando el ID del producto como parámetro
    this.router.navigate(['/producto-edit', product.id]);
  }
}
