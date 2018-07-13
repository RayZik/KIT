import { Routes, RouterModule } from '@angular/router';
import { SeparatorComponent } from './separator.component';



const separatorRoutes: Routes = [
  {
    path: '',
    component: SeparatorComponent
  },
];

export const SeparatorRoutes = RouterModule.forChild(separatorRoutes);
