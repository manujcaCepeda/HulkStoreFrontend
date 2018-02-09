import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Producto, ProductoStatus } from '../models/producto';
import { Observable } from 'rxjs/Observable';

import { Headers } from '@angular/http';

@Injectable()
export class ProductoService {

  URL = 'http://181.211.5.38:8081/producto';
  headers = new Headers({ 'Content-Type': 'application/json' });


  constructor(private http: Http) { }

  /*getArticulos(): Promise<any> {
    return this.http.get(this.URL)
      .toPromise()
      .then(res =>
        res.json()
      )
      .catch(error => {
        const msg = error.json();
        return Promise.reject(msg);
      });
  }*/



  /*login(login: Producto): Observable<ProductoStatus> {
    const url = `${this.serverUrl}/account/login`;
    return this.http.get(url)
      .map(this.extractData)
      .catch((error: any) => {
        debugger;
        return Observable.of(new ProductoStatus('FAILURE', 'Username or password is incorrect. Please try again!'));
      });
  }*/

  getProductos() {
    return this.http.get(this.URL)
      .map((res: Response) => res.json())
      .map(res => res.data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  guardarProducto(newProduct: Producto): Promise<ProductoStatus> {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.URL, newProduct, options)
      .toPromise()
      .then(res => res.json())
      .catch((error: any) => {
        console.log("error---------> " + error.json());
        Observable.throw(error.json())
      });
  }

  deleteProducto(idProducto:number) {
    const urlDelete = `${this.URL}/${idProducto}`;
    return this.http.delete(urlDelete)
      .map(res => res);
  }

}
