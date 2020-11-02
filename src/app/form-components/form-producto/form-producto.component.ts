import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models.entity/producto/producto';
import { ProductoService } from 'src/app/models.service/producto/producto.service';
import Swal from 'sweetalert2'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  producto:Producto =new Producto();
  nroDeProducto:number;

  nombreFormControl = new FormControl('', [
    Validators.required, Validators.minLength(2),
  ]);
  marcaFormControl = new FormControl('', [
    Validators.required, Validators.minLength(2),
  ]);
  porcionFormControl = new FormControl('', [
    Validators.required, Validators.minLength(4),
      Validators.pattern("^[0-9]*$"),
  ]);
  precioUnidadFormControl = new FormControl('', [
    Validators.required, Validators.minLength(1),
      Validators.pattern("^[0-9]*$"),
  ]);
  stockFormControl = new FormControl('', [
    Validators.required, Validators.minLength(3),
      Validators.pattern("^[0-9]*$"),
  ]);
  tipoFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

 constructor(private productoService:ProductoService,
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
        this.productoService.getProducto(id).subscribe(
            (producto)=> this.producto = producto);
      }else{
        this.inicializar();
      }
    })
  }
  
  inicializar(){
    this.productoService.getCountProductos().subscribe(
      (Count)=>{this.nroDeProducto = Count}
    );
  }

  save(){
    if(this.verificarValidez()){
      if(this.nroDeProducto>0){
        this.producto.id = this.nroDeProducto + 1;
        this.productoService.createProducto(this.producto).subscribe(
          papeleta => { 
            Swal.fire('Nuevo producto',
              `Producto guardada con éxito`,'success');
              this.goto("../hello/producto");
          },
          error =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Revise la validez del formulario porfavor.',
            })
          }
        );
      }else{
        this.productoService.updateProducto(this.producto).subscribe(
          papeleta => { 
            Swal.fire('Producto editada',
              `Producto guardada con éxito`,'success');
            this.goto("../hello/producto");
          },
          error =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Revise la validez del formulario porfavor.',
            })
          }
        );
      }
    }
  }
  verificarValidez():boolean{
    let message:string = "Verifique ";
    let valido:boolean = true;
    if(!this.producto.nombre){
      message += 'el nombre, ';
      valido = false;
    } 
    if(!this.producto.tipo){
      message += 'el tipo, ';
      valido = false;
    } 
    if(!this.producto.porcionPorPersona){
      message += 'la porcion por persona, ';
      valido = false;
    } 
    if(!this.producto.precio){
      message += 'el precio, ';
      valido = false;
    } 
    if(!this.producto.marca){
      message += 'la marca, ';
      valido = false;
    } 
    if(!this.producto.stock){
      message += 'el stock, ';
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

}
