import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalleresRoutingModule } from './talleres-routing.module';
import { TalleresListComponent } from './talleres-list/talleres-list.component';
import { TallerDetailComponent } from './taller-detail/taller-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TalleresListComponent,
    TallerDetailComponent
  ],
  imports: [
    CommonModule,
    TalleresRoutingModule,
    SharedModule
  ]
})
export class TalleresModule { }
