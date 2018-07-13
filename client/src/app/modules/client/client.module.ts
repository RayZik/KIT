import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClientRoutes } from './client.routing';
import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutes
  ],
  declarations: [
    ClientComponent
  ]
})
export class ClientModule { }
