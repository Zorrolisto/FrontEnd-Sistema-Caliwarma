import { Component } from '@angular/core';
import { Usuario } from './models.entity/usuario/usuario';
import { LoginService } from './models.service/loginService/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seRegistro:boolean =false;

  constructor(
    private usuarioService:LoginService) {
  }
  usuario:Usuario;

  obtenerRoles(){
    this.usuarioService.getUser().subscribe(
      (usuario)=>this.usuario = usuario
    );
  }
  
  registroExitoso(mensaje) {
    this.seRegistro = mensaje;
  }

  CerrarSesion(){
    this.usuarioService.logout();
    this.seRegistro = false;
  }
}
