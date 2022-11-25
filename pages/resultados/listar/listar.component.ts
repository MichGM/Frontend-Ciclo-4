import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Resultados } from '../../../modelos/resultados.model';
import { ResultadosService } from '../../../servicios/resultados.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  resultados : Resultados[];
  nombresColumnas: string[] = ['Mesa #', 'Votos', 'Nombre', 'Apellido', 'Partido'];
  constructor(private miServicioResultados: ResultadosService,
              private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioResultados.listar().
      subscribe(data => {
        this.resultados=data;
        console.log(data);
      });
  }
  agregar():void{
    this.router.navigate(["pages/resultados/crear"]);
  }
  editar(id:string):void{
    this.router.navigate(["pages/resultados/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar resultado',
      text: "Está seguro que quiere eliminar el resultado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioResultados.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El resultado ha sido eliminado correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
