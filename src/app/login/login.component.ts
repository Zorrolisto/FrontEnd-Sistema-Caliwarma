import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../models.entity/usuario/usuario';
import { LoginService } from '../models.service/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() seRegistro = new EventEmitter<boolean>();;

  username:string='';
  password:string='';
  error:string;
  @Input() usuario:Usuario;

  constructor(
    private usuarioService:LoginService,
    private cookieService:CookieService) {   
       //Verificar si la sesion està activa
      if(this.cookieService.check('username') && this.cookieService.check('password')){
        this.username = this.cookieService.get('username');
        this.password = this.cookieService.get('password');
        this.registrarse();
      } 
  }

  ngOnInit(): void {}

  entrarComoInvitado(){
    this.username = 'invitado';
    this.password = '123';
    this.registrarse();
  }

  registrarse(){
    this.usuarioService.login(this.username, this.password).subscribe(
      (data) => {
        console.log(data);
        this.seRegistro.emit(true);
        this.username="";
        this.error=null;
        this.password="";
      },
      (error)=>{
        this.error = "Datos incorrectos"
      }
    );
  }
}
