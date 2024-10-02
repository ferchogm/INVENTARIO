import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Importa la biblioteca para la encriptación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';  // Inicialización de propiedad username
  password: string = '';  // Inicialización de propiedad password

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async onLogin() {
    try {
      // Consultar la colección 'users' en Firestore para obtener el usuario con el username ingresado
      const userSnapshot = await this.firestore.collection('users', ref => ref.where('username', '==', this.username)).get().toPromise();

      // Verificar si el snapshot es válido y contiene datos
      if (userSnapshot && !userSnapshot.empty) {
        // Si el usuario existe, obtener el documento y castear los datos a cualquier tipo
        const userData: any = userSnapshot.docs[0].data();

        // Desencriptar la contraseña almacenada para compararla
        const decryptedPassword = CryptoJS.AES.decrypt(userData.password, 'tu_clave_secreta').toString(CryptoJS.enc.Utf8);

        // Comparar las contraseñas desencriptadas
        if (decryptedPassword === this.password) {
          console.log('Inicio de sesión exitoso', userData);
          this.router.navigate(['/home']);  // Redirigir a la página principal
        } else {
          console.error('Contraseña incorrecta');
          alert('Contraseña incorrecta');
        }
      } else {
        console.error('Usuario no encontrado');
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Error al iniciar sesión');
    }
  }
}
