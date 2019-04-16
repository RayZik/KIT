import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PanelComponent,
  ],
  imports: [
    PanelRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class PanelModule { }
