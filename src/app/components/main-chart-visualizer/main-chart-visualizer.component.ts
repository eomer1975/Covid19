import { Component, OnInit } from '@angular/core';
import { MainChartComponentInput } from '../main-chart/main-chart.component';
import { FiltersComponentOutput } from '../filters/filters.component';

@Component({
  selector: 'app-main-chart-visualizer',
  templateUrl: './main-chart-visualizer.component.html',
  styleUrls: ['./main-chart-visualizer.component.scss']
})
export class MainChartVisualizerComponent {

  chartData: MainChartComponentInput = {} as MainChartComponentInput;

  manageFilters(filters: FiltersComponentOutput) {
    console.log(filters);
    this.chartData = JSON.parse(
      JSON.stringify(Object.assign(this.chartData, filters))
    );
  }

}
