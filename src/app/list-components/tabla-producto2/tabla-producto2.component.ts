import { AfterViewInit, Component, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {merge, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DialogProductosComponent } from 'src/app/form-components/form-ayuda-components/dialog-productos/dialog-productos.component';
 import { Producto } from 'src/app/models.entity/producto/producto';
import { ProductoService } from 'src/app/models.service/producto/producto.service';

@Component({
  selector: 'app-tabla-producto2',
  templateUrl: './tabla-producto2.component.html',
  styleUrls: ['./tabla-producto2.component.css']
})
export class TablaProducto2Component implements AfterViewInit, OnChanges {

  displayedColumns: string[] = ['id', 'nombre','tipo',
  'porcionPorPersona', 'precio', 'stock', 'marca', 'escoger'];
  
  @Input() nombre:String;
  @Input() marca:String;
  @Input() tipo:String;
  @Input() porcionPorPersona:number;
  @Input() precioEspecificacion:String;
  @Input() precio:number;
  @Input() stockEspecificacion:String;
  @Input() stock:number;

  productos:Producto[];
  resultsLength:number=0;

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productoService:ProductoService,
              private dialogRef:MatDialogRef<DialogProductosComponent>,
              private ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtrarProductos();
  }
  ngAfterViewInit(): void {
    this.filtrarProductos();
  }
  enviar(producto:Producto){
    this.ngZone.run(()=>{
      this.dialogRef.close(producto);
    });
  }

  filtrarProductos(){
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productoService.searchProductos(
            this.nombre,
            this.marca,
            this.tipo,
            this.porcionPorPersona,
            this.precioEspecificacion,
            this.precio,
            this.stockEspecificacion,
            this.stock,
            this.paginator.pageSize,
            this.paginator.pageIndex);
        }),
        map(productos => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.productoService.getCountProductos().subscribe(resultsLength=>this.resultsLength=resultsLength);

          return productos;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the SERVER API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(productos =>  this.productos = productos);
  }
}
