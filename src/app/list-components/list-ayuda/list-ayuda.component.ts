import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { LoginService } from 'src/app/models.service/loginService/login.service';

@Component({
  selector: 'app-list-ayuda',
  templateUrl: './list-ayuda.component.html',
  styleUrls: ['./list-ayuda.component.css']
})
export class ListAyudaComponent implements OnInit {
  @Input() form:boolean;
  nombreProducto:String;
  nombreInstitucion:String;
  porcionesEspecificacion:String;
  porcionesTotales:number;
  precioEspecificacion:String;
  precioTotal:number;
  fechaDeRegistroEspecificacion:String;
  fechaDeRegistro:Date;
  fechaDeEnvioEspecificacion:String;
  fechaDeEnvio:Date;
  fechaDeLlegadaEspecificacion:String;
  fechaDeLlegada:Date;

  usuario:Usuario;
  
  constructor(private usuarioService:LoginService) { }

  ngOnInit(): void {
  this.cargarUsuario();
  }

  public cargarUsuario(){
    this.usuarioService.getUser().subscribe(
      (usuario)=>this.usuario = usuario
    );
  }

  Buscar(any:any){
    this.nombreProducto = any[0]; 
    this.nombreInstitucion = any[1]; 
    this.porcionesEspecificacion = any[2]; 
    this.porcionesTotales = any[3]; 
    this.precioEspecificacion = any[4]; 
    this.precioTotal = any[5]; 
    this.fechaDeRegistroEspecificacion = any[6]; 
    this.fechaDeRegistro = any[7]; 
    this.fechaDeEnvioEspecificacion = any[8]; 
    this.fechaDeEnvio = any[9]; 
    this.fechaDeLlegadaEspecificacion = any[10]; 
    this.fechaDeLlegada = any[11]; 
  }
}
