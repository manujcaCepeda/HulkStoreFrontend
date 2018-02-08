import { Component, OnInit } from '@angular/core';
import { IngresoStatus, Ingreso } from '../../models/ingreso';
import { IngresoService } from '../../services/ingreso.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  alertStyle = '';
  ingresoStatus = new IngresoStatus('', '');
  model = new Ingreso(0, 0, '', '', 0, '', 0);

  public productos = new Array();
  ingresos: Ingreso[];
  producto = "Seleccione Producto";

  constructor(private ingresoService: IngresoService, private productoService: ProductoService) { }

  ngOnInit() {
    this.initIngreso();
    this.getProductos();
    this.getIngresos();
  }

  private initIngreso() {
    this.alertStyle = '';
    this.ingresoStatus.codigo = '';
    this.ingresoStatus.mensaje = '';
  }

  getProductos() {
    this.productoService.getProductos()
      .subscribe((productos: any) => {
        this.productos = productos;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de categorias de productos, navigating to login: ', error);
      });
  }

  getIngresos() {
    this.ingresoService.getIngresos()
      .subscribe((ingresos: Ingreso[]) => {
        this.ingresos = ingresos;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de ingresos, navigating to login: ', error);
      });
  }

  onChange(evt: any) {
    for (let prod of this.productos) {
      if (prod.id === parseInt(evt)) {
        this.model.precio = prod.precio;
      }
    }
  }

  onChangeCantidad() {
    this.model.total = this.model.precio * this.model.cantidad;
  }

  guardarIngreso() {
    this.model.producto = { id: this.producto };
    this.model.usuario = { id: 2 };
    debugger;
    this.ingresoService.guardarIngreso(this.model)
      .then((status: IngresoStatus) => {
        this.ingresoStatus.codigo = "INGRESO_EXITOSO";
        this.ingresoStatus.mensaje = "Ingreso Ingreso: Exitoso!";
        this.resetIngreso();
      }).catch(error => {
        this.alertStyle = 'alert alert-danger';
        this.ingresoStatus.mensaje = "Ya existe un ingreso!";
      });
    this.alertStyle = 'alert alert-success';

  }

  private resetIngreso() {
    this.getIngresos();
    this.model = new Ingreso(0, 0, '', '', 0, '', 0);
    this.producto = "Seleccione Producto";
  }

  public removerIngreso(id) {
    this.ingresoService.deleteIngreso(id)
      .subscribe((res: any) => {
        this.getIngresos();
        this.alertStyle = 'alert alert-success';
        this.ingresoStatus.codigo = "DELETE_EXITOSO";
        this.ingresoStatus.mensaje = "Se eliminó el Ingreso: Exitoso!";
      },
      error => {
        console.error('Ocurrio un error al eliminar un ingreso, navigating to login: ', error);
      });
  }

  cancelar() {
    this.resetIngreso();
    this.initIngreso();
    this.ingresoStatus.codigo = null;
  }
}