import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Certifique-se de importar o FormsModule
    ReactiveFormsModule, // Adicione o ReactiveFormsModule
    HttpClientModule, // Adicione o HttpClientModule
    AppRoutingModule,
    FontAwesomeModule // Importe apenas FontAwesomeModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
