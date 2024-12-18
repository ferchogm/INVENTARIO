import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//NUEVAS IMPORTACIONEA PARA 

import { jsPDF } from 'jspdf';

// Firebase Imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';  // Asegúrate de tener tu archivo environment.ts configurado

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Configuración de Ionic
    AppRoutingModule,
    ReactiveFormsModule,
    
    // Configuración de Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,  // Autenticación de Firebase
    AngularFirestoreModule  // Firestore de Firebase
  ],
  providers: [
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Permite el uso de componentes personalizados de Ionic
})
export class AppModule {}
