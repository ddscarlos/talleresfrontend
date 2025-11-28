import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListComponent } from './reservas-list/reservas-list.component';
import { ReservaDetailComponent } from './reserva-detail/reserva-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ReservasListComponent,
    ReservaDetailComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    SharedModule
  ]
})
export class ReservasModule { }
