import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from 'src/app/models.entity/producto/producto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url:string = 'http://localhost:8081/api/v1/QW/productos'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private cookieService:CookieService) { }

  //BUSCAR PRODUCTOS
  searchProductos(nombre:String,marca:String,tipo:String, porcionPorPersona:number,precioCondicion:String,
    precio:number,stockCondicion:String, stock:number,size: number, page: number): Observable<Producto[]>{
      const headers:HttpHeaders = this.headers();
    let buscar=''; 
    buscar = nombre ? buscar+'&nombre='+nombre : buscar + '';
    buscar = marca ? buscar+'&marca='+marca : buscar + '';
    buscar = tipo ? buscar+'&tipo='+tipo : buscar + '';
    buscar = porcionPorPersona!=null ? buscar+'&porcionPorPersona='+porcionPorPersona : buscar + '';
    buscar = precioCondicion ? buscar+'&precioCondicion='+precioCondicion : buscar + '';
    buscar = precio!=null ? buscar+'&precio='+precio : buscar + '';
    buscar = stockCondicion ? buscar+'&stockCondicion='+stockCondicion : buscar + '';
    buscar = stock!=null ? buscar+'&stock='+stock : buscar + '';
    return this.http.get<Producto[]>(`${this.url}/busqueda?size=${size}&page=${page+1}${buscar}`, {headers});
  }
  getCountProductos(): Observable<number>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<number>(`${this.url}/count`, {headers});
  }
  //PARA GRABAR PRODUCTOS
  createProducto(producto: Producto): Observable<Producto>{
    const headers:HttpHeaders = this.headers();
    return this.http.post<Producto>(
      this.url, producto, {headers}
    );
  }
  //OBTENER PRODUCTO
  getProducto(id:number):Observable<Producto>{
    const headers:HttpHeaders = this.headers();
    return this.http.get<Producto>(`${this.url}/${id}`, {headers});
  }
  //ACTUALIZA PRODUCTO
  updateProducto(producto: Producto): Observable<Producto>{
    const headers:HttpHeaders = this.headers();
    return this.http.put<Producto>(
      `${this.url}/${producto.id}`, producto, {headers}
    );
  }
  //ELIMINAR PRODUCTO
  deleteProducto(id: number):Observable<Producto>{
    const headers:HttpHeaders = this.headers();
      return this.http.delete<Producto>(
      `${this.url}/${id}`,
      {headers});
  }

  headers():HttpHeaders{
    let username:string = this.cookieService.get('username');
    let password:string = this.cookieService.get('password');
    return new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
  }
}
