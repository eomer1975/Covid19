import { Component } from "@angular/core";
import { FiltersComponentOutput } from "./filters/filters.component";
import { MainChartComponentInput } from "./main-chart/main-chart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Covid";
  chartData: MainChartComponentInput = {} as MainChartComponentInput;

  manageFilters(filters: FiltersComponentOutput) {
    console.log(filters);
    this.chartData = JSON.parse(
      JSON.stringify(Object.assign(this.chartData, filters))
    );
  }
}
