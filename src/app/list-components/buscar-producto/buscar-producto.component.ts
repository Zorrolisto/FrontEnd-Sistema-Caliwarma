import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {
  busqueda:boolean = false;
  nombre:String;
  marca:String;
  tipo:String;
  porcionPorPersona:number;
  precioEspecificacion:String;
  precio:number;
  stockEspecificacion:String;
  stock:number;
  @Output()
  propagar = new EventEmitter<any>(); 

  constructor() { }

  Buscar(){
    let list  = [
      this.nombre,
      this.marca,
      this.tipo,
      this.porcionPorPersona,
      this.precioEspecificacion,
      this.precio,
      this.stockEspecificacion,
      this.stock
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
    this.nombre = null;
    this.marca = null;
    this.tipo = null;
    this.porcionPorPersona = null;
    this.precioEspecificacion = null;
    this.precio = null;
    this.stockEspecificacion = null;
    this.stock = null;
  }

  cerrarBusqueda():void{
    this.busqueda = false;
  }
}
