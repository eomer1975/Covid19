import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainChartComponent } from "./components/main-chart/main-chart.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { HttpClientModule } from "@angular/common/http";
import { DxChartModule, DxSelectBoxModule, DxTemplateModule, DxTagBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { MainChartVisualizerComponent } from './components/main-chart-visualizer/main-chart-visualizer.component';

@NgModule({
  declarations: [AppComponent, MainChartComponent, FiltersComponent, MainChartVisualizerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxChartModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTagBoxModule,
    DxCheckBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
