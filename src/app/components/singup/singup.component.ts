import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginStatus, Login, Registro } from '../../models/login';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  alertStyle = '';
  loginStatus = new LoginStatus('', '');
  model = new Registro('', '', '', '', '', '', '');

  constructor(private usuarioService: UsuarioService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }


  onRegister() {
    this.model.rol = { id: 3 };
    this.usuarioService.guardarUsuario(this.model)
      .then((status: LoginStatus) => {
        this.loginStatus.codigo = "INGRESO_EXITOSO";
        this.loginStatus.mensaje = "Ingreso Nuevo Usuario: Exitoso!";
        this.router.navigateByUrl('/singin');
      }).catch(error => {
        this.alertStyle = 'alert alert-danger';
        this.loginStatus.codigo = "USER_EXISTE";
        this.loginStatus.mensaje = "Ya existe un registro con su correo!";
      });
    this.alertStyle = 'alert alert-success';

  }

  private initLogin() {
    this.alertStyle = '';
    this.loginStatus.codigo = '';
    this.loginStatus.mensaje = '';
  }
}
