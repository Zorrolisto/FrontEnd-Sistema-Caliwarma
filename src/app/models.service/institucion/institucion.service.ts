import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institucion } from 'src/app/models.entity/institucion/institucion';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  private url:string = 'http://localhost:8081/api/v1/QW/instituciones'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private cookieService:CookieService) { }

  //BUSCAR INSTITUCIONES
  searchInstituciones(nombre:String, nroDeAlumnos:number, nivel:String, numero:String, departamento:String, 
    provincia:String, distrito:String, direccion:String,size: number, page: number): Observable<Institucion[]>{
      const headers:HttpHeaders = this.headers();
    let buscar=''; 
    buscar = nombre ? buscar+'&nombre='+nombre : buscar + '';
    buscar = nroDeAlumnos!=null ? buscar+'&nroDeAlumnos='+nroDeAlumnos : buscar + '';
    buscar = nivel ? buscar+'&nivel='+nivel : buscar + '';
    buscar = numero ? buscar+'&numero='+numero : buscar + '';
    buscar = departamento ? buscar+'&departamento='+departamento : buscar + '';
    buscar = provincia ? buscar+'&provincia='+provincia : buscar + '';
    buscar = distrito ? buscar+'&distrito='+distrito : buscar + '';
    buscar = direccion ? buscar+'&direccion='+direccion : buscar + '';
    console.log(buscar);
    return this.http.get<Institucion[]>(`${this.url}/busqueda?size=${size}&page=${page+1}${buscar}`, {headers});
  }
  getCountInstituciones(): Observable<number>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<number>(`${this.url}/count`, {headers});
  }
  //PARA GRABAR INSTITUCIONES
  createInstituciones(institucion: Institucion): Observable<Institucion>{
    const headers:HttpHeaders = this.headers();
    return this.http.post<Institucion>(
      this.url, institucion, {headers}
    );
  }
  //OBTENER INSTITUCION
  getInstitucion(id:number):Observable<Institucion>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<Institucion>(`${this.url}/${id}`, {headers});
  }
  //ACTUALIZA INSTITUCION
  updateInstitucion(institucion: Institucion): Observable<Institucion>{
    const headers:HttpHeaders = this.headers();
    return this.http.put<Institucion>(
      `${this.url}/${institucion.id}`, institucion, {headers}
    );
  }
  //ELIMINAR INSTITUCION
  deleteInstitucion(id: number):Observable<Institucion>{
    const headers:HttpHeaders = this.headers();
      return this.http.delete<Institucion>(
      `${this.url}/${id}`,
      {headers});
  }
  headers():HttpHeaders{
    let username:string = this.cookieService.get('username');
    let password:string = this.cookieService.get('password');
    return new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
  }
}
