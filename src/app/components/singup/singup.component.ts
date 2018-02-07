import { Component, OnInit } from '@angular/core';
import { LoginStatus, Login } from '../../models/login';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  alertStyle = '';
  loginStatus = new LoginStatus('', '');
  model = new Login('', '');

  constructor() { }

  ngOnInit() {
  }


  onRegister() {
    debugger;
    this.initLogin();
    /*this.authService.login(this.model)
      .subscribe((status: LoginStatus) => {
        this.loginStatus = status;
        if (status.code === 'FAILURE') {
          this.alertStyle = 'alert alert-danger';
        }
      });*/
      this.loginStatus.code = "404";
      this.loginStatus.message = "Erorr xxx x  x x x ";
      this.alertStyle = 'alert alert-danger';
  }

  onLogout() {
    //this.authService.logout();
  }

  private initLogin() {
    this.alertStyle = '';
    this.loginStatus.code = '';
    this.loginStatus.message = '';
  }
}
