import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage implements OnInit {
  products: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.firestore.collection('products').snapshotChanges().subscribe(res => {
      this.products = res.map(product => {
        const data = product.payload.doc.data() as any;
        const id = product.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Productos', 10, 10);
    this.products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} (${product.category}) - Stock: ${product.stock}`, 10, 20 + (index * 10));
    });
    doc.save('reporte_productos.pdf');
  }
}
