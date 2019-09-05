import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteCadComponent } from './components/cliente-cad.component';
import { ClienteListComponent } from './components/cliente-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    ClienteCadComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
