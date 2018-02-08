import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos: Producto[];
  
  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos()
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      });
  }
}
