import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {DatabaseComponent} from './database/database.component';
import { TablesComponent } from './database/tables/tables.component';
import { TableColsComponent } from './database/table-cols/table-cols.component';
import {DatabaseBarService} from "./_services/database/database-bar.service";
import {HttpClientModule} from '@angular/common/http';
import { ConnectionComponent } from './database/connection/connection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TablesComponent,
    TableColsComponent,
    DatabaseComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DatabaseBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
