import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-institucion',
  templateUrl: './buscar-institucion.component.html',
  styleUrls: ['./buscar-institucion.component.css']
})
export class BuscarInstitucionComponent implements OnInit {
  busqueda:boolean = false;
  nombre:String;
  nroDeAlumnos:number;
  nivel:String;
  numero:number;
  departamento:String;
  provincia:String;
  distrito:String;
  direccion:String;
  @Output()
  propagar = new EventEmitter<any>(); 

  constructor() { }

  Buscar(){
    let list  = [
      this.nombre,
      this.nroDeAlumnos,
      this.nivel,
      this.numero,
      this.departamento,
      this.provincia,
      this.distrito,
      this.direccion
    ];
    this.propagar.emit(list);
  }

  iniciarBusqueda():void{
    this.busqueda=true;
  }

  limpiarBusqueda():void{
    this.inicializar();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar():void{
    this.numero = null;
    this.nombre = null;
    this.nroDeAlumnos = null;
    this.nivel = null;
    this.departamento = null;
    this.provincia = null;
    this.distrito = null;
    this.direccion = null;
  }

  cerrarBusqueda():void{
    this.busqueda = false;
  }

}
