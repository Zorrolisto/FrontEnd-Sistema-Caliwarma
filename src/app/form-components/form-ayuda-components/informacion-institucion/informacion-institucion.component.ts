import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { MatDialog } from '@angular/material/dialog';
import { DialogInstitucionesComponent } from '../dialog-instituciones/dialog-instituciones.component';

@Component({
  selector: 'app-informacion-institucion',
  templateUrl: './informacion-institucion.component.html',
  styleUrls: ['./informacion-institucion.component.css']
})
export class InformacionInstitucionComponent implements OnInit {

  @Input() institucion:Institucion;
  @Output() propagar = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogInstitucion(){
    const dialogRef = this.dialog.open( DialogInstitucionesComponent, {
      width: '1200px',
      height: '645px'
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          this.institucion = result;
          this.propagar.emit(result);
        }
    });
  }

}
