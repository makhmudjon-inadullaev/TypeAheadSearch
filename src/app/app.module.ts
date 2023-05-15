import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypeaheadSearch } from './typeahead-search/typeahead-search.component';
import { AppDropdown } from './components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './category.service';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    TypeaheadSearch,
    AppDropdown,
    ErrorAlertComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CategoryService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
