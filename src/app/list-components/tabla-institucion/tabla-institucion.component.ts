import { AfterViewInit, Component, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {merge, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { InstitucionService } from 'src/app/models.service/institucion/institucion.service';
import { LoginService } from 'src/app/models.service/loginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-institucion',
  templateUrl: './tabla-institucion.component.html',
  styleUrls: ['./tabla-institucion.component.css']
})
export class TablaInstitucionComponent implements AfterViewInit, OnChanges {
 
  displayedColumns: string[] = ['id', 'numero','nombre',
  'nroDeAlumnos', 'nivel', 'departamento', 'provincia', 
  'distrito', 'editar',  'eliminar'];
  
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
  
  usuario:Usuario;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private institucionService:InstitucionService,
    private usuarioService:LoginService,
    private router         :Router,
    private activatedRoute :ActivatedRoute) 
  { }

  public cargarUsuario(){
    this.usuarioService.getUser().subscribe(
      (usuario)=>this.usuario = usuario
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filtrarInstituciones();
  }
  ngAfterViewInit(): void {
    this.cargarUsuario();
    this.filtrarInstituciones();
  }

  eliminar(id:number){
    this.institucionService.deleteInstitucion(id).subscribe(
      (succesfull)=>{
        Swal.fire('Institucion Eliminada',
          `Institucion eliminada con éxito`,'success'); 
          this.goto("../hello/ayuda");
          this.goto("../hello/institucion");
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pruebe otra vez porfavor.',
        })
      }
    );
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
  public goto(url:string){
    this.router.navigate([url]).then((e)=>{
      if(e){
        console.log("Navigation succesfull!");
      }else{
        console.log("Navigation has failed!");
      }
    });
  }

}
