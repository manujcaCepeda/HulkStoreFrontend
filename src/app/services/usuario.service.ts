import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { Headers } from '@angular/http';
import { Login, Registro, LoginStatus } from '../models/login';


@Injectable()
export class UsuarioService {

  URL = 'http://181.211.5.38:8081/usuario';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  login(login:Login) {
    const url = `${this.URL}/${login.email}/${login.password}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .map(res => res.data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  guardarUsuario(newUser: Registro): Promise<LoginStatus> {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.URL, newUser, options)
      .toPromise()
      .then(res => res.json())
      .catch((error: any) => {
        console.log("error---------> " + error.json());
        Observable.throw(error.json())
      });
  }
  
}
