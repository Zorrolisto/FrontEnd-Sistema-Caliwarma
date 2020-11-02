import { AfterViewInit, Component, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {merge, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
 import { Producto } from 'src/app/models.entity/producto/producto';
import { Usuario } from 'src/app/models.entity/usuario/usuario';
import { LoginService } from 'src/app/models.service/loginService/login.service';
import { ProductoService } from 'src/app/models.service/producto/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements AfterViewInit, OnChanges {
 
  displayedColumns: string[] = ['id', 'nombre','tipo',
  'porcionPorPersona', 'precio', 'stock', 'marca', 'editar',  'eliminar'];
  
  @Input() nombre:String;
  @Input() marca:String;
  @Input() tipo:String;
  @Input() porcionPorPersona:number;
  @Input() precioEspecificacion:String;
  @Input() precio:number;
  @Input() stockEspecificacion:String;
  @Input() stock:number;

  usuario:Usuario;

  productos:Producto[];
  resultsLength:number=0;

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productoService:ProductoService,
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
    this.filtrarProductos();
  }
  ngAfterViewInit(): void {
    this.cargarUsuario();
    this.filtrarProductos();
  }
  eliminar(id:number){
    this.productoService.deleteProducto(id).subscribe(
      (succesfull)=>{
        Swal.fire('Producto Eliminado',
          `Producto eliminado con éxito`,'success'); 
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
