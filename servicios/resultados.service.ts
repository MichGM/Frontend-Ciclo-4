import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resultados } from '../modelos/resultados.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Resultados[]> {
    return this.http.get<Resultados[]>(`${environment.url_gateway}/resultados`);
  }
  eliminar(id: string) {
    return this.http.delete<Resultados>(`${environment.url_gateway}/resultados/${id}`);
  }
  getResultado(id: string): Observable<Resultados> {
    return this.http.get<Resultados>(`${environment.url_gateway}/resultados/${id}`);
  }
  crear(id_candidato:string, id_mesa:string, elResultado: Resultados) {
    return this.http.post(`${environment.url_gateway}/resultados/candidato/${id_candidato}/mesa/${id_mesa}`, elResultado);
  }
  editar(id_resultado:string, id_candidato:string, id_mesa:string, elResultado: Resultados) {
    return this.http.put(`${environment.url_gateway}/resultados/${id_resultado}/candidato/${id_candidato}/mesa/${id_mesa}`, elResultado);
  }
  
}
