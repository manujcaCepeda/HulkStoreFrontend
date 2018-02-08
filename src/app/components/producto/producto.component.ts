import { Component, OnInit } from '@angular/core';
import { Producto, ProductoStatus } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  alertStyle = '';
  productoStatus = new ProductoStatus('', '');
  model = new Producto(0, '', '', '', 0, 0, '');
  public categorias = new Array();
  productos: Producto[];
  categoria = "Seleccione Categoría";

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.initProducto();
    this.getCategoria();
    this.getProductos();
  }

  private initProducto() {
    this.alertStyle = '';
    this.productoStatus.codigo = '';
    this.productoStatus.mensaje = '';
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

  getCategoria() {
    this.categoriaService.getCategoria()
      .subscribe((categorias: any) => {
        this.categorias = categorias;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de categorias de productos, navigating to login: ', error);
      });
  }

  guardarProducto() {

    if(this.model.precio === 0){
      this.alertStyle = 'alert alert-danger';
      this.productoStatus.codigo = "PRECIO_CERO";
      this.productoStatus.mensaje = "Precio debe ser mayor a 0!";
      return;
    }
    
    if(this.model.cantidad === 0){
      this.alertStyle = 'alert alert-danger';
      this.productoStatus.codigo = "CANTIDAD_CERO";
      this.productoStatus.mensaje = "Cantidad debe ser mayor a 0!";
      return;
    }

    

    this.model.categoria = { codigo: this.categoria };
    this.productoService.guardarProducto(this.model)
      .then((status: ProductoStatus) => {
        this.productoStatus.codigo = "INGRESO_EXITOSO";
        this.productoStatus.mensaje = "Ingreso Producto: Exitoso!";
        this.resetProducto();
      }).catch(error => {
        this.alertStyle = 'alert alert-danger';
        this.productoStatus.codigo = "PRODUCTO_EXISTE";
        this.productoStatus.mensaje = "Ya existe un producto!";
      });
    this.alertStyle = 'alert alert-success';

  }

  private resetProducto() {
    this.getProductos();
    this.model = new Producto(0, ' ', ' ', ' ', 0, 0, ' ');
    this.categoria = "Seleccione Categoría";
  }

  public removerProducto(id) {
    this.productoService.deleteProducto(id)
      .subscribe((res: any) => {
        this.getProductos();
        this.alertStyle = 'alert alert-success';
        this.productoStatus.codigo = "DELETE_EXITOSO";
        this.productoStatus.mensaje = "Se eliminó el Producto: Exitoso!";
      },
      error => {
        console.error('Ocurrio un error al eliminar un producto, navigating to login: ', error);
      });
  }

  cancelar() {
    this.resetProducto();
    this.initProducto();
    this.productoStatus.codigo = null;
  }
}
