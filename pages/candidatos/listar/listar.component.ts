import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidatos } from '../../../modelos/candidatos.model';
import { CandidatosService } from '../../../servicios/candidatos.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  candidatos : Candidatos[];
  nombresColumnas: string[] = ['Cedula','Nombre','Apellido','Partido', 'Asignar/Modificar/Eliminar'];
  constructor(private miServicioCandidatos: CandidatosService,
              private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioCandidatos.listar().
      subscribe(data => {
        this.candidatos=data;
        console.log(data);
      });
  }
  agregar():void{
    this.router.navigate(["pages/candidatos/crear"]);
  }
  editar(id:string):void{
    this.router.navigate(["pages/candidatos/actualizar/"+id]);
  }
  asignar(id:string):void{
    this.router.navigate(["pages/candidatos/asignar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Candidato',
      text: "Está seguro que quiere eliminar el candidato?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioCandidatos.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El candidato ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
