import { Component, OnInit } from '@angular/core';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-compras-realizadas',
  templateUrl: './compras-realizadas.component.html',
  styleUrls: ['./compras-realizadas.component.css']
})
export class ComprasRealizadasComponent implements OnInit {

  misCompras: Venta[];

  constructor(private ventaService: VentaService) { }

  ngOnInit() {
    this.getMisVentas();
  }

  getMisVentas() {

    let usuarioId = localStorage.getItem("HulkStore-UsuarioID");
    this.ventaService.getVentas(usuarioId)
      .subscribe((misCompras: Venta[]) => {
        this.misCompras = misCompras;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      });
  }

}
