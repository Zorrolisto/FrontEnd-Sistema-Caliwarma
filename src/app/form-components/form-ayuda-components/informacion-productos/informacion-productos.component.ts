import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LineaDeAyuda } from 'src/app/models.entity/lineaDeAyuda/linea-de-ayuda';
import { DialogProductosComponent } from '../dialog-productos/dialog-productos.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-informacion-productos',
  templateUrl: './informacion-productos.component.html',
  styleUrls: ['./informacion-productos.component.css']
})
export class InformacionProductosComponent implements OnInit {
  
  @Input() lineasDeAyudas:LineaDeAyuda[]; 
  @Output() propagar = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogProductos(){
    const dialogRef = this.dialog.open( DialogProductosComponent, {
      width: '1200px',
      height: '645px'
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          let exists:boolean = false;
          
          if(this.lineasDeAyudas){
            for(let l of this.lineasDeAyudas){
              if(l.producto.id == result.id){
                exists=true;
              }
            }
          }
          if(!exists){
            let nuevaLinea:LineaDeAyuda = new LineaDeAyuda();
            nuevaLinea.producto=result;
            this.propagar.emit(nuevaLinea);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El producto ya ha sido escogido,escoja otro porfavor.',
            })
          }
        }
    });
  }

}
