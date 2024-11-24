import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular'; // Importamos ToastController
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  productoId: string | null = null; // Variable para almacenar el ID
  productoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Para redirigir
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private toastController: ToastController // Para mostrar notificaciones
  ) {
    // Inicializa el formulario
    this.productoForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      barcode: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Obtén el ID del producto de la URL
    this.productoId = this.route.snapshot.paramMap.get('id');

    if (this.productoId) {
      // Carga los datos del producto desde Firestore
      this.firestore
        .collection('products')
        .doc(this.productoId)
        .valueChanges()
        .subscribe((product: any) => {
          if (product) {
            this.productoForm.patchValue({
              name: product.name,
              category: product.category,
              stock: product.stock,
              barcode: product.barcode,
            });
          }
        });
    }
  }

// Método para guardar los cambios
async saveProducto() {
  if (this.productoForm.valid && this.productoId) {
    try {
      // Actualiza los datos en Firestore
      await this.firestore.collection('products').doc(this.productoId).update(this.productoForm.value);

      // Muestra el mensaje de confirmación
      const toast = await this.toastController.create({
        message: 'Producto actualizado con éxito',
        duration: 2000,
        color: 'success',
      });
      await toast.present();

      // Redirige a la lista de productos
      this.router.navigate(['/producto-list']);
    } catch (error) {
      console.error('Error al actualizar el producto: ', error);

      // Muestra un mensaje de error si falla
      const toast = await this.toastController.create({
        message: 'Error al guardar los cambios',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}


}
