import { Component, Input, OnInit } from '@angular/core';
import { LineaDeAyuda } from 'src/app/models.entity/lineaDeAyuda/linea-de-ayuda';

@Component({
  selector: 'app-lineas-de-ayudas',
  templateUrl: './lineas-de-ayudas.component.html',
  styleUrls: ['./lineas-de-ayudas.component.css']
})
export class LineasDeAyudasComponent implements OnInit {

  @Input() lineasDeAyudas:LineaDeAyuda[];
  constructor() { }

  ngOnInit(): void {
  }

}
