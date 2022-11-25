import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidatos } from '../modelos/candidatos.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Candidatos[]> {
    return this.http.get<Candidatos[]>(`${environment.url_gateway}/candidatos`);
  }
  eliminar(id: string) {
    return this.http.delete<Candidatos>(`${environment.url_gateway}/candidatos/${id}`);
  }
  getCandidato(id: string): Observable<Candidatos> {
    return this.http.get<Candidatos>(`${environment.url_gateway}/candidatos/${id}`);
  }
  crear(elCandidato: Candidatos) {
    return this.http.post(`${environment.url_gateway}/candidatos`, elCandidato);
  }
  editar(id:string,elCandidato: Candidatos) {
    return this.http.put(`${environment.url_gateway}/candidatos/${id}`, elCandidato);
  }
  asignar(id:string,id_partido:string) {
    return this.http.put(`${environment.url_gateway}/candidatos/${id}/partido/${id_partido}`,"");
  }

}