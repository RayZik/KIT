import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EntryRoutingModule } from './entry-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EntryComponent } from './entry.component';



@NgModule({
  declarations: [
    EntryComponent
  ],
  imports: [
    BrowserModule,
    EntryRoutingModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [EntryComponent]
})
export class EntryModule { }
