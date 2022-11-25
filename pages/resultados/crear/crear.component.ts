import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Resultados } from '../../../modelos/resultados.model';
import { CandidatosService } from '../../../servicios/candidatos.service';
import { MesasService } from '../../../servicios/mesas.service';
import { ResultadosService } from '../../../servicios/resultados.service';
import { Candidatos } from '../../../modelos/candidatos.model';
import { Mesas } from '../../../modelos/mesas.model';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  modoCreacion: boolean = true;
  id_resultado: string = "";
  id_mesa:string = "";
  id_candidato:string = "";
  intentoEnvio: boolean = false;
  candidatos:Candidatos[];
  mesas: Mesas[];
  elResultado: Resultados = {
    votos: 0
  }
  constructor(private miServicioResultados: ResultadosService,
    private miServicioCandidatos: CandidatosService,
    private miServicioMesas: MesasService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }
 
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_resultado) {
      this.modoCreacion = false;
      this.id_resultado = this.rutaActiva.snapshot.params.id_resultado;
      this.getResultado(this.id_resultado)
    } else {
      this.modoCreacion = true;
      this.getCandidatos();
      this.getMesas();

    }
  }
  getResultado(id: string) {
    this.miServicioResultados.getResultado(id).
      subscribe(data => {
        this.elResultado = data;
      });
  }
  getCandidatos() {
    this.miServicioCandidatos.listar().
      subscribe(data => {
        this.candidatos = data;
        console.log(data);
      });
  }
  getMesas() {
    this.miServicioMesas.listar().
      subscribe(data => {
        this.mesas = data;
        console.log(data)
      });
  }

  guardarIdCandidato( event:any){
    this.candidatos.forEach(element => {
      if(element.nombre===event.target.value){
        this.id_candidato=element._id
      }
    });
    console.log(event.target.value);
    console.log(this.id_candidato);
  }

  guardarIdMesa( event:any){
    this.mesas.forEach(element => {
      console.log(element)
      if(element.numero==event.target.value){
        this.id_mesa=element._id
      }
    });
    console.log(event);
    console.log(this.id_mesa);
  }

  agregar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioResultados.crear(this.id_candidato, this.id_mesa, this.elResultado).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El resultado ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/resultados/listar"]);
        });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioResultados.editar(this.elResultado._id,this.id_candidato,this.id_mesa,this.elResultado).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El candidato ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/candidatos/listar"]);
        });
    }

  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elResultado.votos==0){
        
      return false;
    }else{
      return true;
    }
  } 
}

