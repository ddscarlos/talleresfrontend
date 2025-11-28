import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasListComponent } from './reservas-list/reservas-list.component';
import { ReservaDetailComponent } from './reserva-detail/reserva-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReservasListComponent
  },
  {
    path: ':id',
    component: ReservaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
