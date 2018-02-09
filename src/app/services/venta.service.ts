import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Ingreso, IngresoStatus } from '../models/ingreso';
import { Observable } from 'rxjs/Observable';

import { Headers } from '@angular/http';
import { Venta, VentaStatus } from '../models/venta';

@Injectable()
export class VentaService {

  URL = 'http://181.211.5.38:8081/venta';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }


  realizarCompra(newVenta: Venta): Promise<VentaStatus> {
    debugger;
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.URL, newVenta, options)
      .toPromise()
      .then(res => res.json())
      .catch((error: any) => {
        console.log("error---------> " + error.json());
        Observable.throw(error.json())
      });
  }



  getVentas(usuarioId:number) {
    const url = `${this.URL}/${usuarioId}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .map(res => res.data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
