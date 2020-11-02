import { Component, Input, OnInit } from '@angular/core';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { LoginService } from 'src/app/models.service/loginService/login.service';

@Component({
  selector: 'app-list-institucion',
  templateUrl: './list-institucion.component.html',
  styleUrls: ['./list-institucion.component.css']
})
export class ListInstitucionComponent implements OnInit {
  @Input() form:boolean;
  nombre:String;
  nroDeAlumnos:number;
  nivel:String;
  numero:number;
  departamento:String;
  provincia:String;
  distrito:String;
  direccion:String;
  institucion:Institucion = new Institucion();
  
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
    this.nombre = any[0]; 
    this.nroDeAlumnos = any[1]; 
    this.nivel = any[2]; 
    this.numero = any[3]; 
    this.departamento = any[4]; 
    this.provincia = any[5]; 
    this.distrito = any[6]; 
    this.direccion = any[7]; 
  }
}
