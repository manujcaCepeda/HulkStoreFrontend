import { Component, OnInit } from '@angular/core';
import { Producto, ProductoStatus } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  alertStyle = '';
  productoStatus = new ProductoStatus('', '');
  model = new Producto('', '', '', 0, 0, '');
  public categorias = new Array();
  productos: Producto[];

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.categorias.push({ codigo: "CAMI", descripcion: "Camisetas Polos" });
    this.categorias.push({ codigo: "VAS", descripcion: "Vasos de colección" });

    this.initProducto();

    this.productoService.getProductos()
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
        console.log("1--------> " + this.productos.length);
      },
      error => {
        console.error('An error occurred in retrieving doctors list, navigating to login: ', error);
      });

  }

  onRegister() {
    /*debugger;
    this.initLogin();
    this.productoService.getProductos()
      /*.subscribe((status: ProductoStatus) => {
        this.loginStatus = status;
        if (status.code === 'FAILURE') {
          this.alertStyle = 'alert alert-danger';
        }
      });*/
    /*.subscribe(productos => this.productos = productos,
    error => {
      //this.router.navigateByUrl('/auth/login');
      console.error('An error occurred in retrieving doctors list, navigating to login: ', error);
    });
  /*this.loginStatus.code = "404";
  this.loginStatus.message = "Erorr xxx x x x x ";
  this.alertStyle = 'alert alert-danger';*/
  }

  onLogout() {
    //this.authService.logout();
  }

  private initProducto() {
    this.alertStyle = '';
    this.productoStatus.code = '';
    this.productoStatus.message = '';
  }

  public removerProducto(id) {
    console.log("----------------->");
  }
}
