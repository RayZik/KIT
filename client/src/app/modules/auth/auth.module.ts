import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
