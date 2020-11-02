import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {merge, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';import { Ayuda } from 'src/app/models.entity/ayuda/ayuda';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { AyudaService } from 'src/app/models.service/ayuda/ayuda.service';
import { LoginService } from 'src/app/models.service/loginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-ayuda',
  templateUrl: './tabla-ayuda.component.html',
  styleUrls: ['./tabla-ayuda.component.css']
})
export class TablaAyudaComponent implements AfterViewInit, OnChanges {
 
  displayedColumns: string[] = ['id', 
  'fechaDeLlegada','fechaDeRegistro', 'fechaDeEnvio',
  'porcionesTotales', 'precioTotal', 'nombreInstitucion'
  ,  'editar',  'eliminar'];
  
  @Input() nombreProducto:String;
  @Input() nombreInstitucion:String;
  @Input() porcionesEspecificacion:String;
  @Input() porcionesTotales:number;
  @Input() precioEspecificacion:String;
  @Input() precioTotal:number;
  @Input() fechaDeRegistroEspecificacion:String;
  @Input() fechaDeRegistro:Date;
  @Input() fechaDeEnvioEspecificacion:String;
  @Input() fechaDeEnvio:Date;
  @Input() fechaDeLlegadaEspecificacion:String;
  @Input() fechaDeLlegada:Date;

  ayudas:Ayuda[];
  resultsLength:number=0;

  isLoadingResults = true;
  isRateLimitReached = false;
  
  usuario:Usuario;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ayudaService:AyudaService,
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
    this.ayudaService.deleteAyuda(id).subscribe(
      (succesfull)=>{
        Swal.fire('Ayuda Eliminada',
          `Ayuda eliminada con éxito`,'success'); 
          this.goto("../hello/ayuda");
          this.goto("../hello/producto");
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
          return this.ayudaService.searchAyudas(
            this.nombreProducto,
            this.nombreInstitucion,
            this.porcionesEspecificacion,
            this.porcionesTotales,
            this.precioEspecificacion,
            this.precioTotal,
            this.fechaDeRegistroEspecificacion,
            this.fechaDeRegistro,
            this.fechaDeEnvioEspecificacion,
            this.fechaDeEnvio,
            this.fechaDeLlegadaEspecificacion,
            this.fechaDeLlegada,
            this.paginator.pageSize,
            this.paginator.pageIndex);
        }),
        map(ayudas => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.ayudaService.getCountAyudas().subscribe(resultsLength=>this.resultsLength=resultsLength);

          return ayudas;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the SERVER API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(ayudas =>  this.ayudas = ayudas);
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
