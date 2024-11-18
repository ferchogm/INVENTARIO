import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Importa la biblioteca para la encriptación

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  rol: string = '';  // Aquí se almacenará el rol seleccionado

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async onRegister() {
    try {
      // Generar un UID para el nuevo usuario
      const uid = this.firestore.createId();

      // Encriptar la contraseña antes de guardarla
      const encryptedPassword = CryptoJS.AES.encrypt(this.password, 'tu_clave_secreta').toString();
      
      // Crear el objeto del nuevo usuario
      const newUser = {
        uid: uid,
        name: this.name,
        username: this.username,
        email: this.email,
        password: encryptedPassword,  // Guarda la contraseña encriptada
        rol: this.rol
      };

      // Guardar el nuevo usuario en la colección 'users' de Firestore
      await this.firestore.collection('users').doc(uid).set(newUser);

      console.log('Usuario registrado correctamente');
      alert('Usuario registrado correctamente');
      this.router.navigate(['/login']);  // Redirigir al login después del registro

    } catch (error) {
      console.error('Error al registrar el usuario', error);
      alert('Error al registrar el usuario');
    }
  }

  // Cerrar sesión
  logout() {
    console.log("Cerrando sesión");
    // Aquí va la lógica para cerrar sesión
  }

  goToHome() {
    this.router.navigate(['/home']); // Reemplaza '/home' por la ruta correspondiente a tu menú principal
  }
    // Método para regresar al menú principal
    goBackToMenu() {
      this.router.navigate(['/home']);
    }
  
}
