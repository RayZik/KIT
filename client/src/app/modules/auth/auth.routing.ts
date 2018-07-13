import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';



const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
];

export const AuthRoutes = RouterModule.forChild(authRoutes);
