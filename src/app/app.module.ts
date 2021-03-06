import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { VentaComponent } from './components/venta/venta.component';
import { StockComponent } from './components/stock/stock.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './app.routes';
import { ProductoService } from './services/producto.service';
import { HttpModule } from '@angular/http';
import { CategoriaService } from './services/categoria.service';
import { UsuarioService } from './services/usuario.service';
import { IngresoService } from './services/ingreso.service';
import { VentaService } from './services/venta.service';
import { ComprasRealizadasComponent } from './components/compras-realizadas/compras-realizadas.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    IngresoComponent,
    VentaComponent,
    StockComponent,
    NavbarComponent,
    SinginComponent,
    SingupComponent,
    HomeComponent,
    ComprasRealizadasComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    HttpModule
  ],
  providers: [ProductoService, CategoriaService, UsuarioService, IngresoService, VentaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
