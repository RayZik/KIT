import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';



const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent
  },
];

export const ClientRoutes = RouterModule.forChild(clientRoutes);
