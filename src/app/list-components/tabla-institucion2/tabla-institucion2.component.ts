import { AfterViewInit, Component, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {merge, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';import { DialogInstitucionesComponent } from 'src/app/form-components/form-ayuda-components/dialog-instituciones/dialog-instituciones.component';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { InstitucionService } from 'src/app/models.service/institucion/institucion.service';

@Component({
  selector: 'app-tabla-institucion2',
  templateUrl: './tabla-institucion2.component.html',
  styleUrls: ['./tabla-institucion2.component.css']
})
export class TablaInstitucion2Component implements AfterViewInit, OnChanges {
 
  displayedColumns: string[] = ['id', 'numero','nombre',
  'nroDeAlumnos', 'nivel', 'departamento', 'provincia', 
  'distrito', 'escoger'];
  
  @Input() nombre:String;
  @Input() nroDeAlumnos:number;
  @Input() nivel:String;
  @Input() numero:number;
  @Input() departamento:String;
  @Input() provincia:String;
  @Input() distrito:String;
  @Input() direccion:String;

  instituciones:Institucion[];
  resultsLength:number=0;

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private institucionService:InstitucionService,
    private dialogRef: MatDialogRef<DialogInstitucionesComponent>,
    private ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtrarInstituciones();
  }
  ngAfterViewInit(): void {
    this.filtrarInstituciones();
  }

  enviar(institucion:Institucion){
    this.ngZone.run(()=>{
      this.dialogRef.close(institucion);
    });
  }

  filtrarInstituciones(){
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          let numero:String = this.numero ? this.numero.toString() : '';
          return this.institucionService.searchInstituciones(
            this.nombre,
            this.nroDeAlumnos,
            this.nivel,
            numero,
            this.departamento,
            this.provincia,
            this.distrito,
            this.direccion,
            this.paginator.pageSize,
            this.paginator.pageIndex);
        }),
        map(instituciones => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.institucionService.getCountInstituciones().subscribe(resultsLength=>this.resultsLength=resultsLength);

          return instituciones;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the SERVER API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(instituciones =>  this.instituciones = instituciones);
  }
}
