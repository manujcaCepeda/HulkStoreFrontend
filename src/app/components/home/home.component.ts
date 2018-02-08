import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Venta, DetalleVenta, VentaStatus } from '../../models/venta';
import { VentaService } from '../../services/venta.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rol: String = '';
  alertStyle = '';
  ventaStatus = new VentaStatus('', '');
  productos: Producto[];
  productoSeleccionado: Producto;
  itemsCarritoCompra: Producto[] = [];
  verCarritoCompras: boolean = false;


  constructor(private productoService: ProductoService, private ventaService: VentaService) { }

  ngOnInit() {
    this.getProductos();



    let timer = Observable.timer(100, 100);
    timer.subscribe(t => {
      this.rol = localStorage.getItem("HulkStore-Rol");
      if (!this.rol) {
        this.verCarritoCompras = false;
        this.alertStyle = '';
      }

    });

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

  seleccionarArticulo(producto: Producto) {
    this.productoSeleccionado = producto;
    console.log("1-------------------->producto " + this.productoSeleccionado.id);
  }

  addArticulo() {


    for (let prod of this.productos) {
      if (prod.id === this.productoSeleccionado.id) {
        prod.cantidad = prod.cantidad - 1;
      }
    }
    this.itemsCarritoCompra.push(this.productoSeleccionado);
  }

  clickVerCarritoCompras() {
    this.verCarritoCompras = true;
  }


  realizarCompra() {
    console.log("2-------------------->ver carrito de compras ");
    let detalleVenta: any[] = [];
    let subtotal: number = 0;
    for (let prod of this.itemsCarritoCompra) {
      let detalle = new DetalleVenta({ id: prod.id }, 1, prod.precio, prod.precio * 1);
      subtotal = subtotal + prod.precio * 1;
      detalleVenta.push(detalle);
    }

    let usuarioId = localStorage.getItem("HulkStore-UsuarioID");

    let iva = subtotal * 0.12;
    let total = subtotal + iva;
    let venta = new Venta(subtotal, iva, total, { id: parseInt(usuarioId) }, detalleVenta);


    debugger;
    this.ventaService.realizarCompra(venta)
      .then((status: VentaStatus) => {
        this.ventaStatus.codigo = "INGRESO_EXITOSO";
        this.ventaStatus.mensaje = "Se ralizó la compra de forma exitosa: Exitoso!";

        this.getProductos();
        this.itemsCarritoCompra = [];
        this.verCarritoCompras = false;

      }).catch(error => {
        this.alertStyle = 'alert alert-danger';
        this.ventaStatus.mensaje = "Error en la compra!";
      });
    this.alertStyle = 'alert alert-success';

  }
}
