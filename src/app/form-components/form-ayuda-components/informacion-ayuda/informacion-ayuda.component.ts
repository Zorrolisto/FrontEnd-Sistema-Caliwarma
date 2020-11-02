import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ayuda } from 'src/app/models.entity/ayuda/ayuda';

@Component({
  selector: 'app-informacion-ayuda',
  templateUrl: './informacion-ayuda.component.html',
  styleUrls: ['./informacion-ayuda.component.css']
})
export class InformacionAyudaComponent implements OnInit {

  @Input() ayuda:Ayuda;
  @Output() propagar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  actualizarPersonas($event: any){
    this.propagar.emit($event);
  }
}
