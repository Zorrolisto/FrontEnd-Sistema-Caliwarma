import { Component, Input, OnInit } from '@angular/core';
import { Institucion } from 'src/app/models.entity/institucion/institucion';

@Component({
  selector: 'app-informacion-solo-institucion',
  templateUrl: './informacion-solo-institucion.component.html',
  styleUrls: ['./informacion-solo-institucion.component.css']
})
export class InformacionSoloInstitucionComponent implements OnInit {

  @Input() institucion:Institucion;
  
  constructor() { }

  ngOnInit(): void {
  }

}
