import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categoriesremove',
  templateUrl: './categoriesremove.page.html',
  styleUrls: ['./categoriesremove.page.scss'],
})
export class CategoriesremovePage implements OnInit {
  categories: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  onLogout() {
    // Aquí puedes realizar la lógica para cerrar sesión
    // Por ejemplo, eliminar tokens de autenticación o información de usuario. 

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  goBackToMenu() {
    this.router.navigate(['/categories']);
  }

  async loadCategories() {
    try {
      const snapshot = await this.firestore.collection('categories').get().toPromise();
      if (snapshot) {
        this.categories = snapshot.docs.map(doc => doc.data());
      } else {
        this.categories = [];
      }
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      this.categories = [];
    }
  }

  async deleteCategory(categoryName: string) {
    try {
      const categoryRef = this.firestore.collection('categories', ref => ref.where('name', '==', categoryName));
      const snapshot = await categoryRef.get().toPromise();

      if (!snapshot || snapshot.empty) {
        this.showAlert('Error', 'Categoría no encontrada');
        return;
      }

      snapshot.forEach(doc => {
        doc.ref.delete();
      });

      this.showAlert('Éxito', 'Categoría eliminada correctamente');
      this.loadCategories(); // Recargar las categorías después de eliminar una
    } catch (error) {
      this.showAlert('Error', 'Error al eliminar la categoría');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}