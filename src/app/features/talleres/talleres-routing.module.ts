import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalleresListComponent } from './talleres-list/talleres-list.component';
import { TallerDetailComponent } from './taller-detail/taller-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TalleresListComponent
  },
  {
    path: ':id',
    component: TallerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresRoutingModule { }
