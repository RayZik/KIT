import { Routes, RouterModule } from '@angular/router';



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'separator',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: 'modules/auth/auth.module#AuthModule'
  },
  {
    path: 'client',
    loadChildren: 'modules/client/client.module#ClientModule'
  },
  {
    path: 'separator',
    loadChildren: 'modules/separator/separator.module#SeparatorModule'
  },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
