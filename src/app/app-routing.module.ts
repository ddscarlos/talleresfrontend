import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./features/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'talleres',
    loadChildren: () => import('./features/talleres/talleres.module').then(m => m.TalleresModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservas',
    loadChildren: () => import('./features/reservas/reservas.module').then(m => m.ReservasModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
