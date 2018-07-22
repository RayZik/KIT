import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClientRoutes } from './client.routing';
import { ClientComponent } from './client.component';

import { MenuModule } from 'components/menu/menu.module';



@NgModule({
  imports: [
    CommonModule,
    ClientRoutes,
    MenuModule
  ],
  declarations: [
    ClientComponent
  ]
})
export class ClientModule { }
