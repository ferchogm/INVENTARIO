import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categoriesadd',
  templateUrl: './categoriesadd.page.html',
  styleUrls: ['./categoriesadd.page.scss'],
})
export class CategoriesaddPage implements OnInit {
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
    this.router.navigate(['/categories']);
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
    } catch (error) {
      this.showAlert('Error', 'Error al crear la categoría');
    }
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
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}