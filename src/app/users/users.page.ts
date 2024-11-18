import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsers();
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

  async loadUsers() {
    try {
      const snapshot = await this.firestore.collection('users').get().toPromise();
      if (snapshot) {
        this.users = snapshot.docs.map(doc => {
          const data = doc.data();
          if (typeof data === 'object' && data !== null) {
            return { ...data, id: doc.id };
          } else {
            return { id: doc.id };
          }
        });
      } else {
        this.users = [];
      }
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      this.users = [];
    }
  }

  async addUser() {
    // Aquí puedes agregar la lógica para crear un nuevo usuario
    // Por ejemplo, redirigir a una página de creación de usuario
    this.router.navigate(['/register']);
  }

  async deleteUser(userId: string) {
    try {
      await this.firestore.collection('users').doc(userId).delete();
      this.showAlert('Éxito', 'Usuario eliminado correctamente');
      this.loadUsers(); // Recargar los usuarios después de eliminar uno
    } catch (error) {
      this.showAlert('Error', 'Error al eliminar el usuario');
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

  // Regresar a la página de inventarios
  goBackToInventario() {
    this.router.navigate(['/inventario']);
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