import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ayuda } from 'src/app/models.entity/ayuda/ayuda';
import { AyudaService } from 'src/app/models.service/ayuda/ayuda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-ayuda',
  templateUrl: './form-ayuda.component.html',
  styleUrls: ['./form-ayuda.component.css']
})
export class FormAyudaComponent implements OnInit {
  ayuda:Ayuda= new Ayuda();
  esNueva:boolean=false;
 
  constructor(private ayudaService:AyudaService,
    private router         :Router,
    private activatedRoute :ActivatedRoute) 
  { }
  ngOnInit(): void {
    this.cargarProducto();
  }
  
  public cargarProducto(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){ //Si existe id
        this.ayudaService.getAyuda(id).subscribe(
            (ayuda)=> this.ayuda = ayuda);
      }else{
        this.inicializar();
      }
    })
  }
  
  inicializar(){
    this.ayudaService.getCountAyudas().subscribe(
      (Count)=>{this.ayuda.id = Count + 1}
    );
    this.ayuda.precioTotal=0;
    this.esNueva = true;
  }

  save(){
    if(this.verificarValidez()){
      if(this.esNueva){
        this.ayudaService.createAyuda(this.ayuda).subscribe(
          papeleta => { 
            Swal.fire('Nueva Ayuda',
              `Ayuda guardada con éxito`,'success');
              this.goto("../hello/ayuda");
          },
          error =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message
            })
          }
        );
      }else{
        this.ayudaService.updateAyuda(this.ayuda).subscribe(
          papeleta => { 
            Swal.fire('Ayuda editada',
              `Ayuda guardada con éxito`,'success');
            this.goto("../hello/ayuda");
          },
          error =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message
            })
          }
        );
      }
    }
  }verificarValidez():boolean{
    let message:string = "Verifique ";
    let valido:boolean = true;
    if(!this.ayuda.fechaDeRegistro){
      message += 'la fecha de registro, ';
      valido = false;
    } 
    if(!this.ayuda.fechaDeEnvio){
      message += 'la fecha de envio, ';
      valido = false;
    } 
    if(!this.ayuda.fechaDeLlegada){
      message += 'la fecha de llegada, ';
      valido = false;
    } 
    if(!this.ayuda.porcionesTotales){
      message += 'la cantidad de niños a alcanzar, ';
      valido = false;
    } 
    if(!this.ayuda.institucion){
      message += 'la institucion, ';
      valido = false;
    } 
    if(!this.ayuda.lineasDeAyudas){
      message += 'los/el producto(s), ';
      valido = false;
    } 
    if(!valido){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message + 'porfavor.',
      })
      return false;
    }
    return true;
  }
  
  syncInstitucion($event: any){
    this.ayuda.institucion = $event;
    console.log(this.ayuda.institucion.nombre);
  }
  syncProductos($event: any){
    if(!this.ayuda.lineasDeAyudas){
      this.ayuda.lineasDeAyudas = []; 
    }
    let nroDeRaciones:number = Math.round(this.ayuda.porcionesTotales/$event.producto.porcionPorPersona);
    $event.porciones=nroDeRaciones;
    try {
      this.ayuda.lineasDeAyudas.push($event);
      console.log('guardardo nro ' + this.ayuda.lineasDeAyudas.length);
    } catch (error) {
      console.log('error bipbopbipbop');
    }
    this.ayuda.precioTotal = this.ayuda.precioTotal + nroDeRaciones*$event.producto.precio;
  }
  actualizarPersonas($event: any){
    if(this.ayuda.lineasDeAyudas){
      let nroDeRaciones:number;
      this.ayuda.precioTotal = 0;
      for(let l of this.ayuda.lineasDeAyudas){
        nroDeRaciones = Math.round(this.ayuda.porcionesTotales/l.producto.porcionPorPersona);
        l.porciones = nroDeRaciones;
        this.ayuda.precioTotal = this.ayuda.precioTotal + nroDeRaciones*l.producto.precio;
      }
    }
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
