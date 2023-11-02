import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPPage } from './login-p.page';
import { HttpClientModule } from '@angular/common/http';
import { LoginPPageRoutingModule } from './login-p-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    LoginPPageRoutingModule
  ],
  declarations: [LoginPPage]
})
export class LoginPPageModule {}
