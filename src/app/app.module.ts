import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainChartComponent } from "./main-chart/main-chart.component";
import { FiltersComponent } from "./filters/filters.component";
import { HttpClientModule } from "@angular/common/http";
import { DxChartModule, DxSelectBoxModule, DxTemplateModule, DxTagBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent, MainChartComponent, FiltersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxChartModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTagBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
