import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ProductoComponent } from '../components/producto/producto.component';
import { Producto, ProductoStatus } from '../models/producto';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductoService {

  URL = 'http://localhost:8080/producto';

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


}
