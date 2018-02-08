import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: String = '';
  usuario: String = '';

  constructor() { }

  ngOnInit() {
    let timer = Observable.timer(100, 100);
    timer.subscribe(t => {
      this.rol = localStorage.getItem("HulkStore-Rol");
      this.usuario = localStorage.getItem("HulkStore-Usuario");
    });
  }

  onLogout() {
    debugger;
    localStorage.clear();
    this.rol = '';
    this.usuario = '';
  }
}
