import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-instituciones',
  templateUrl: './dialog-instituciones.component.html',
  styleUrls: ['./dialog-instituciones.component.css']
})
export class DialogInstitucionesComponent implements OnInit {
  
  form:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<DialogInstitucionesComponent>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public institucion:Institucion = new Institucion()) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.ngZone.run(()=>{
      this.dialogRef.close();
    });
  }
}
