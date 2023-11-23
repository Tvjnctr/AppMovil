import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

// Importa las siguientes líneas
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Añade esta línea
import { environment } from '../../environments/environment'; 
import { FirebaseService } from '../servicio/firebase.service';  // Añade esta línea

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  declarations: [HomePage],
  providers: [
    AngularFireDatabase,  // Añade esta línea
    FirebaseService,  // Añade esta línea
  ],
})
export class HomePageModule {}
