import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-ayuda',
  templateUrl: './buscar-ayuda.component.html',
  styleUrls: ['./buscar-ayuda.component.css']
})
export class BuscarAyudaComponent implements OnInit {

  busqueda:boolean = false;
  //propierties
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

  @Output()
  propagar = new EventEmitter<any>(); 

  constructor() { }
  
  Buscar(){
    let list  = [
      this.nombreProducto,
      this.nombreInstitucion,
      this.porcionesEspecificacion,
      this.porcionesTotales,
      this.precioEspecificacion,
      this.precioTotal,
      this.fechaDeRegistroEspecificacion,
      this.fechaDeRegistro,
      this.fechaDeEnvioEspecificacion,
      this.fechaDeEnvio,
      this.fechaDeLlegadaEspecificacion,
      this.fechaDeLlegada
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
    this.nombreProducto = null;
    this.nombreInstitucion = null;
    this.porcionesEspecificacion = null;
    this.porcionesTotales = null;
    this.precioEspecificacion = null;
    this.precioTotal = null;
    this.fechaDeRegistroEspecificacion = null;
    this.fechaDeRegistro = null;
    this.fechaDeEnvioEspecificacion = null;
    this.fechaDeEnvio = null;
    this.fechaDeLlegadaEspecificacion = null;
    this.fechaDeLlegada = null;
  }

  cerrarBusqueda():void{
    this.busqueda = false;
  }
}
