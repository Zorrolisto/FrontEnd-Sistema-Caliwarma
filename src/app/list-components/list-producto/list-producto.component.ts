import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { LoginService } from 'src/app/models.service/loginService/login.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  @Input() form:boolean;
  nombre:String;
  marca:String;
  tipo:String;
  porcionPorPersona:number;
  precioEspecificacion:String;
  precio:number;
  stockEspecificacion:String;
  stock:number;
  
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
    this.marca = any[1]; 
    this.tipo = any[2]; 
    this.porcionPorPersona = any[3]; 
    this.precioEspecificacion = any[4]; 
    this.precio = any[5]; 
    this.stockEspecificacion = any[6]; 
    this.stock = any[7]; 
  }

}
