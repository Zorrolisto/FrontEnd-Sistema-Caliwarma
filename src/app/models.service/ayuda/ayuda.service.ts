import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs'

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Ayuda } from 'src/app/models.entity/ayuda/ayuda';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {

  private url:string = 'http://localhost:8081/api/v1/QW/ayudas'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private cookieService:CookieService) { }

  //BUSCAR AYUDAS
  searchAyudas(producto:String, institucion:String,porcionesTotalesCondicion:String, porcionesTotales:number, precioTotalCondicion:String, 
    precioTotal:number, fechaDeRegistroCondicion:String, fechaDeRegistro:Date, fechaDeEnvioCondicion:String, fechaDeEnvio:Date, 
    fechaDeLlegadaCondicion:String, fechaDeLlegada:Date, size: number, page: number): Observable<Ayuda[]>{
    let buscar=''; 
    buscar = producto ? buscar+'&producto='+producto : buscar + '';
    buscar = institucion ? buscar+'&institucion='+institucion : buscar + '';
    buscar = porcionesTotalesCondicion ? buscar+'&porcionesTotalesCondicion='+porcionesTotalesCondicion : buscar + '';
    buscar = porcionesTotales ? buscar+'&porcionesTotales='+porcionesTotales : buscar + '';
    buscar = precioTotalCondicion ? buscar+'&precioTotalCondicion='+precioTotalCondicion : buscar + '';
    buscar = precioTotal ? buscar+'&precioTotal='+precioTotal : buscar + '';
    buscar = fechaDeRegistroCondicion ? buscar+'&fechaDeRegistroCondicion='+fechaDeRegistroCondicion : buscar + '';
    buscar = fechaDeRegistro ? buscar+'&fechaDeRegistro='+fechaDeRegistro : buscar + '';
    buscar = fechaDeEnvioCondicion ? buscar+'&fechaDeEnvioCondicion='+fechaDeEnvioCondicion : buscar + '';
    buscar = fechaDeEnvio ? buscar+'&fechaDeEnvio='+fechaDeEnvio : buscar + '';
    buscar = fechaDeLlegadaCondicion ? buscar+'&fechaDeLlegadaCondicion='+fechaDeLlegadaCondicion : buscar + '';
    buscar = fechaDeLlegada ? buscar+'&fechaDeLlegada='+fechaDeLlegada : buscar + '';
    console.log(buscar);
    const headers:HttpHeaders = this.headers();
    return this.http.get<Ayuda[]>(`${this.url}/busqueda?size=${size}&page=${page+1}${buscar}`, {headers});
  }
  getCountAyudas(): Observable<number>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<number>(`${this.url}/count`, {headers});
  }
  //PARA GRABAR AYUDAS
  createAyuda(ayuda: Ayuda): Observable<Ayuda>{
    const headers:HttpHeaders = this.headers();
    return this.http.post<Ayuda>(
      this.url, ayuda, {headers}
    );
  }
  //OBTENER AYUDA
  getAyuda(id:number):Observable<Ayuda>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<Ayuda>(`${this.url}/${id}`, {headers});
  }
  //ACTUALIZA AYUDA
  updateAyuda(ayuda: Ayuda): Observable<Ayuda>{
    const headers:HttpHeaders = this.headers();
    return this.http.put<Ayuda>(
      `${this.url}/${ayuda.id}`, ayuda, {headers}
    );
  }
  //ELIMINAR AYUDA
  deleteAyuda(id: number):Observable<Ayuda>{
    const headers:HttpHeaders = this.headers();
      return this.http.delete<Ayuda>(
      `${this.url}/${id}`,
      {headers});
  }
  headers():HttpHeaders{
    let username:string = this.cookieService.get('username');
    let password:string = this.cookieService.get('password');
    return new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
  }
}
