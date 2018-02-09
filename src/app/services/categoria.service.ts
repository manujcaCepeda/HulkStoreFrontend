import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriaService {

  URL = 'http://181.211.5.38:8081/categoria';

  constructor(private http: Http) { }

  getCategoria() {
    return this.http.get(this.URL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
