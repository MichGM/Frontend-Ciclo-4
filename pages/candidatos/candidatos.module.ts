import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';

import { CandidatosRoutingModule } from './candidatos-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { AsignarComponent } from './asignar/asignar.component';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
    AsignarComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class CandidatosModule { }
