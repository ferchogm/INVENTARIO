import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  newCategoryName: string = '';
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
    this.router.navigate(['/home']);
  }

  async loadCategories() {
    try {
      const snapshot = await this.firestore.collection('categories').get().toPromise();
      if (snapshot) {
        this.categories = snapshot.docs.map(doc => {
          const data = doc.data();
          if (typeof data === 'object' && data !== null) {
            return { ...data, id: doc.id, isEditing: false };
          } else {
            return { id: doc.id, isEditing: false };
          }
        });
      } else {
        this.categories = [];
      }
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      this.categories = [];
    }
  }

  async addCategory() {
    try {
      if (this.newCategoryName.trim().length === 0) {
        this.showAlert('Error', 'El nombre de la categoría no puede estar vacío');
        return;
      }

      const newCategory = {
        name: this.newCategoryName,
        createdAt: new Date()
      };

      await this.firestore.collection('categories').add(newCategory);

      this.showAlert('Éxito', 'Categoría creada correctamente');
      this.newCategoryName = ''; 
      this.loadCategories(); // Recargar las categorías después de agregar una
    } catch (error) {
      this.showAlert('Error', 'Error al crear la categoría');
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

  editCategory(category: any) {
    category.isEditing = true;
  }

  async saveCategory(category: any) {
    try {
      await this.firestore.collection('categories').doc(category.id).update({ name: category.name });
      category.isEditing = false;
      this.showAlert('Éxito', 'Categoría actualizada correctamente');
      this.loadCategories(); // Recargar las categorías después de editar una
    } catch (error) {
      this.showAlert('Error', 'Error al actualizar la categoría');
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

    // Cerrar sesión
    logout() {
      console.log("Cerrando sesión");
      // Aquí va la lógica para cerrar sesión
    }
  
    goToHome() {
      this.router.navigate(['/home']); // Reemplaza '/home' por la ruta correspondiente a tu menú principal
    }
}