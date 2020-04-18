import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainChartComponent } from "./components/main-chart-visualizer/main-chart/main-chart.component";
import { FiltersComponent } from "./components/main-chart-visualizer/filters/filters.component";
import { HttpClientModule } from "@angular/common/http";
import { DxChartModule, DxSelectBoxModule, DxTemplateModule, DxTagBoxModule, DxCheckBoxModule, DxResponsiveBoxModule, DxDateBoxModule, DxButtonModule } from 'devextreme-angular';
import { MainChartVisualizerComponent } from './components/main-chart-visualizer/main-chart-visualizer.component';
import { LegalNotesComponent } from './components/legal-notes/legal-notes.component';

@NgModule({
  declarations: [AppComponent, MainChartComponent, FiltersComponent, MainChartVisualizerComponent, LegalNotesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxChartModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTagBoxModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
