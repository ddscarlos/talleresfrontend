import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from '../services/auth.service';
import { TalleresService } from '../services/talleres.service';
import { ReservasService } from '../services/reservas.service';
import { PagosService } from '../services/pagos.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    TalleresService,
    ReservasService,
    PagosService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
