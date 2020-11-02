import { Institucion } from '../institucion/institucion';
import { LineaDeAyuda } from '../lineaDeAyuda/linea-de-ayuda';

export class Ayuda {
    id:number;
    fechaDeLlegada:Date;
    fechaDeRegistro:Date;
    fechaDeEnvio:Date;
    porcionesTotales:number;
    precioTotal:number;
    institucion:Institucion;
    lineasDeAyudas:LineaDeAyuda[];
}
