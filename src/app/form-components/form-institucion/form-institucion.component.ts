import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { Lugar } from 'src/app/models.entity/lugar/lugar';
import { InstitucionService } from 'src/app/models.service/institucion/institucion.service';
import Swal from 'sweetalert2'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-form-institucion',
  templateUrl: './form-institucion.component.html',
  styleUrls: ['./form-institucion.component.css']
})
export class FormInstitucionComponent implements OnInit, AfterViewInit {

  Departamento:string;
  nroDeInstituciones:number;
  institucion: Institucion = new Institucion();

  numeroFormControl = new FormControl('', [
    Validators.required, Validators.minLength(3),
      Validators.pattern("^[0-9]*$"),
  ]);
  nombreFormControl = new FormControl('', [
    Validators.required, Validators.minLength(5),
  ]);
  nroDeAlumnosFormControl = new FormControl('', [
    Validators.required, Validators.minLength(3),
      Validators.pattern("^[0-9]*$"),
  ]);
  nivelFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private institucionService:InstitucionService,
    private router         :Router,
    private activatedRoute :ActivatedRoute) 
  { }
  ngOnInit(): void {
    this.cargarInstitucion();
  }
  
  public cargarInstitucion(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){ //Si existe id
        this.institucionService.getInstitucion(id).subscribe(
            (institucion)=> this.institucion = institucion);
      }else{
        this.inicializar();
      }
    })
  }
  
  inicializar(){
    this.institucionService.getCountInstituciones().subscribe(
      (Count)=>{this.nroDeInstituciones = Count}
    );
    this.institucion.lugar = new Lugar();
  }

  save(){
    if(this.verificarValidez()){
      if(this.nroDeInstituciones>0){
        this.institucion.id = this.nroDeInstituciones + 1;
        this.institucionService.createInstituciones(this.institucion).subscribe(
          papeleta => { 
            Swal.fire('Nueva institucion',
              `Institucion guardada con éxito`,'success');
              this.goto("../hello/institucion");
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
        this.institucionService.updateInstitucion(this.institucion).subscribe(
          papeleta => { 
            Swal.fire('Institucion editada',
              `Institucion guardada con éxito`,'success');
            this.goto("../hello/institucion");
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
  }
  verificarValidez():boolean{
    let message:string = "Verifique ";
    let valido:boolean = true;
    if(!this.institucion.numero){
      message += 'el numero, ';
      valido = false;
    } 
    if(!this.institucion.nombre){
      message += 'el nombre, ';
      valido = false;
    }
    if(!this.institucion.nroDeAlumnos){
      message += 'el numero de alumnos, ';
      valido = false;
    }
    if(!this.institucion.nivel){
      message += 'el nivel, ';
      valido = false;
    }
    if(!this.institucion.lugar.direccion){
      message += 'la direccion, ';
      valido = false;
    }
    if(!this.institucion.lugar.departamento){
      message += 'el departamento, ';
      valido = false;
    }
    if(!this.institucion.lugar.provincia){
      message += 'la provincia, ';
      valido = false;
    }
    if(!this.institucion.lugar.distrito){
      message += 'el distrito, ';
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
  public goto(url:string){
    this.router.navigate([url]).then((e)=>{
      if(e){
        console.log("Navigation succesfull!");
      }else{
        console.log("Navigation has failed!");
      }
    });
  }
  
  ngAfterViewInit(): void {
    switch(this.institucion.lugar.departamento){
      case 'Amazonas':
        this.Departamento = '0';
        break;
      case 'Ancash':
        this.Departamento = '1';
        break;
      case 'Apurímac':
        this.Departamento = '2';
        break;
      case 'Arequipa':
        this.Departamento = '3';
        break;
      case 'Ayacucho':
        this.Departamento = '4';
        break;
      case 'Cajamarca':
        this.Departamento = '5';
        break;
      case 'Cusco':
        this.Departamento = '6';
        break;
      case 'Huancavelica':
        this.Departamento = '7';
        break;
      case 'Huánuco':
        this.Departamento = '8';
        break;
      case 'Ica':
        this.Departamento = '9';
        break;
      case 'Junín':
        this.Departamento = '10';
        break;
      case 'La Libertad':
        this.Departamento = '11';
        break;
      case 'Lambayeque':
        this.Departamento = '12';
        break;
      case 'Lima':
        this.Departamento = '13';
        break;
      case 'Loreto':
        this.Departamento = '14';
        break;
      case 'Madre de Dios':
        this.Departamento = '15';
        break;
      case 'Moquegua':
        this.Departamento = '16';
        break;
      case 'Pasco':
        this.Departamento = '17';
        break;
      case 'Piura':
        this.Departamento = '18';
        break;
      case 'Puno':
        this.Departamento = '19';
        break;
      case 'San Martín':
        this.Departamento = '20';
        break;
      case 'Tacna':
        this.Departamento = '21';
        break;
      case 'Tumbes':
        this.Departamento = '22';
        break;
      case 'Ucayali':
        this.Departamento = '23';
        break;
    }
  }
  switchDepartamento(){
    switch(this.Departamento){
      case '0':
        this.institucion.lugar.departamento="Amazonas";
        break;
      case '1':
        this.institucion.lugar.departamento="Ancash";
        break;
      case '2':
        this.institucion.lugar.departamento="Apurímac";
        break;
      case '3':
        this.institucion.lugar.departamento="Arequipa";
        break;
      case '4':
        this.institucion.lugar.departamento="Ayacucho";
        break;
      case '5':
        this.institucion.lugar.departamento="Cajamarca";
        break;
      case '6':
        this.institucion.lugar.departamento="Cusco";
        break;
      case '7':
        this.institucion.lugar.departamento="Huancavelica";
        break;
      case '8':
        this.institucion.lugar.departamento="Huánuco";
        break;
      case '9':
        this.institucion.lugar.departamento="Ica";
        break;
      case '10':
        this.institucion.lugar.departamento="Junín";
        break;
      case '11':
        this.institucion.lugar.departamento="La Libertad";
        break;
      case '12':
        this.institucion.lugar.departamento="Lambayeque";
        break;
      case '13':
        this.institucion.lugar.departamento="Lima";
        break;
      case '14':
        this.institucion.lugar.departamento="Loreto";
        break;
      case '15':
        this.institucion.lugar.departamento="Madre de Dios";
        break;
      case '16':
        this.institucion.lugar.departamento="Moquegua";
        break;
      case '17':
        this.institucion.lugar.departamento="Pasco";
        break;
      case '18':
        this.institucion.lugar.departamento="Piura";
        break;
      case '19':
        this.institucion.lugar.departamento="Puno";
        break;
      case '20':
        this.institucion.lugar.departamento="San Martín";
        break;
      case '21':
        this.institucion.lugar.departamento="Tacna";
        break;
      case '22':
        this.institucion.lugar.departamento="Tumbes";
        break;
      case '23':
        this.institucion.lugar.departamento="Ucayali";
        break;
    }
  }
}
