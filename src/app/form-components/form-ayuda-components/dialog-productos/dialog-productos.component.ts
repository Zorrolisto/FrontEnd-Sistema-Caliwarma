import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models.entity/producto/producto';

@Component({
  selector: 'app-dialog-productos',
  templateUrl: './dialog-productos.component.html',
  styleUrls: ['./dialog-productos.component.css']
})
export class DialogProductosComponent implements OnInit {

  form:boolean=true;

  constructor(
    public dialogRef: MatDialogRef<DialogProductosComponent>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public institucion:Producto = new Producto()) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.ngZone.run(()=>{
      this.dialogRef.close();
    });
  }

}
