import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { ListProductoComponent } from './list-components/list-producto/list-producto.component';
import { ListInstitucionComponent } from './list-components/list-institucion/list-institucion.component';
import { ListAyudaComponent } from './list-components/list-ayuda/list-ayuda.component';
import { FormProductoComponent } from './form-components/form-producto/form-producto.component';
import { FormInstitucionComponent } from './form-components/form-institucion/form-institucion.component';
import { FormAyudaComponent } from './form-components/form-ayuda/form-ayuda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InformacionAyudaComponent } from './form-components/form-ayuda-components/informacion-ayuda/informacion-ayuda.component';
import { InformacionInstitucionComponent } from './form-components/form-ayuda-components/informacion-institucion/informacion-institucion.component';
import { InformacionProductosComponent } from './form-components/form-ayuda-components/informacion-productos/informacion-productos.component';
import { InformacionSoloInstitucionComponent } from './form-components/form-ayuda-components/informacion-solo-institucion/informacion-solo-institucion.component';
import { DialogInstitucionesComponent } from './form-components/form-ayuda-components/dialog-instituciones/dialog-instituciones.component';
import { DialogProductosComponent } from './form-components/form-ayuda-components/dialog-productos/dialog-productos.component';
import { LineasDeAyudasComponent } from './form-components/form-ayuda-components/lineas-de-ayudas/lineas-de-ayudas.component';
import { BuscarAyudaComponent } from './list-components/buscar-ayuda/buscar-ayuda.component';
import { BuscarInstitucionComponent } from './list-components/buscar-institucion/buscar-institucion.component';
import { BuscarProductoComponent } from './list-components/buscar-producto/buscar-producto.component';
import { TablaAyudaComponent } from './list-components/tabla-ayuda/tabla-ayuda.component';
import { TablaInstitucionComponent } from './list-components/tabla-institucion/tabla-institucion.component';
import { TablaProductoComponent } from './list-components/tabla-producto/tabla-producto.component';
import { TablaProducto2Component } from './list-components/tabla-producto2/tabla-producto2.component';
import { TablaInstitucion2Component } from './list-components/tabla-institucion2/tabla-institucion2.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'hello/ayuda', pathMatch: 'full' },
  { path: 'hello/ayuda', component: ListAyudaComponent },
  { path: 'hello/form/ayuda', component: FormAyudaComponent },
  { path: 'hello/form/ayuda/:id', component: FormAyudaComponent },
  { path: 'hello/institucion', component: ListInstitucionComponent },
  { path: 'hello/form/institucion', component: FormInstitucionComponent },
  { path: 'hello/form/institucion/:id', component: FormInstitucionComponent },
  { path: 'hello/producto', component: ListProductoComponent },
  { path: 'hello/form/producto', component: FormProductoComponent },
  { path: 'hello/form/producto/:id', component: FormProductoComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ListProductoComponent,
    ListInstitucionComponent,
    ListAyudaComponent,
    FormProductoComponent,
    FormInstitucionComponent,
    FormAyudaComponent,
    InformacionAyudaComponent,
    InformacionInstitucionComponent,
    InformacionProductosComponent,
    InformacionSoloInstitucionComponent,
    DialogInstitucionesComponent,
    DialogProductosComponent,
    LineasDeAyudasComponent,
    BuscarAyudaComponent,
    BuscarInstitucionComponent,
    BuscarProductoComponent,
    TablaAyudaComponent,
    TablaInstitucionComponent,
    TablaProductoComponent,
    TablaProducto2Component,
    TablaInstitucion2Component,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    HttpClientModule,
    MatMenuModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
