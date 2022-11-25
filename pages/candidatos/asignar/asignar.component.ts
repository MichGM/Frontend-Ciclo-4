import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidatosService } from '../../../servicios/candidatos.service';
import { Candidatos } from '../../../modelos/candidatos.model';
import { PartidosService } from '../../../servicios/partidos.service';
import { Partidos } from '../../../modelos/partidos.model';
import { Mesas } from '../../../modelos/mesas.model';

@Component({
  selector: 'ngx-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
  modoCreacion: boolean = true;
  id_candidato: string = "";
  id_partido: string = "";
  intentoEnvio: boolean = false;
  partidos: Partidos[];
  elCandidato: Candidatos = {
    cedula: "",
    nombre: "",
    apellido: "",
    partido:""
  }
  constructor(private miServicioCandidatos: CandidatosService,
    private miServicioPartidos: PartidosService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
      this.getCandidato(this.id_candidato)
      this.getPartidos()
  }
  getCandidato(id: string) {
    this.miServicioCandidatos.getCandidato(id).
      subscribe(data => {
        this.elCandidato = data;
      });
  }

  getPartidos() {
    this.miServicioPartidos.listar().
      subscribe(data => {
        this.partidos = data;
        console.log(data);
      });
  }

  guardarid( event:any){
    this.partidos.forEach(element => {
      if(element.nombre===event.target.value){
        this.id_partido=element._id
      }
    });
    console.log(event.target.value);
    console.log(this.id_partido);

  }

  asignar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletosAsignar()) {
      this.miServicioCandidatos.asignar(this.elCandidato._id, this.id_partido).
        subscribe(data => {
          Swal.fire(
            'Asignado',
            'El Partido ha sido asignado correctamente',
            'success'
          )
          this.router.navigate(["pages/candidatos/listar"]);
        });
    }
  }

  validarDatosCompletosAsignar():boolean{
    this.intentoEnvio=true;
    if(this.elCandidato.cedula=="" || 
       this.elCandidato.nombre=="" || 
       this.elCandidato.apellido==""||
       this.elCandidato.partido==""){
        
      return false;
    }else{
      return true;
    }
  }
}