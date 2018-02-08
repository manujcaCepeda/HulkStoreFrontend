import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Ingreso, IngresoStatus } from '../models/ingreso';
import { Observable } from 'rxjs/Observable';

import { Headers } from '@angular/http';

@Injectable()
export class IngresoService {

  URL = 'http://localhost:8080/ingreso';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getIngresos() {
    return this.http.get(this.URL)
      .map((res: Response) => res.json())
      .map(res => res.data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  guardarIngreso(newIngreso: Ingreso): Promise<IngresoStatus> {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.URL, newIngreso, options)
      .toPromise()
      .then(res => res.json())
      .catch((error: any) => {
        console.log("error---------> " + error.json());
        Observable.throw(error.json())
      });
  }

  deleteIngreso(idIngreso: number) {
    const urlDelete = `${this.URL}/${idIngreso}`;
    return this.http.delete(urlDelete)
      .map(res => res);
  }

}
