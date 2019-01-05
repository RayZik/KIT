import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class MainModule { }
