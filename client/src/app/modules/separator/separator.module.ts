import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SeparatorRoutes } from './separator.routing';
import { SeparatorComponent } from './separator.component';

@NgModule({
  imports: [
    CommonModule,
    SeparatorRoutes
  ],
  declarations: [
    SeparatorComponent
  ]
})
export class SeparatorModule { }
