import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'guest'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/auth/auth.module#AuthModule'
  },
  {
    path: 'panel',
    loadChildren: 'src/app/modules/panel/panel.module#PanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'guest',
    loadChildren: 'src/app/modules/guest/guest.module#GuestModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
