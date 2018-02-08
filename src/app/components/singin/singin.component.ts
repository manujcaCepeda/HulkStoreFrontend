import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Login, LoginStatus } from '../../models/login';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  alertStyle = '';
  loginStatus = new LoginStatus('', '');
  model = new Login('', '');
  usuario:any;


  constructor(public usuarioService:UsuarioService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLogin() {
    debugger;
    this.usuarioService.login(this.model)
      .subscribe((user: any) => {
        this.usuario = user;
        if(!this.usuario){
          this.alertStyle = 'alert alert-danger';
          this.loginStatus.codigo = "ERROR_INGRESO";
          this.loginStatus.mensaje = "Usuario o Password Incorrectos!";
        }

        localStorage.setItem('HulkStore-Rol', this.usuario.rol);
        localStorage.setItem('HulkStore-UsuarioID', this.usuario.id);
        localStorage.setItem('HulkStore-Usuario', this.usuario.nombres + ' ' + this.usuario.apellidos);
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      });
  }

  private initLogin() {
    this.alertStyle = '';
    this.loginStatus.codigo = '';
    this.loginStatus.mensaje = '';
  }

}
