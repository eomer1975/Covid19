import { Component, OnInit, Input } from "@angular/core";
import { MainService } from "../../services/main.service";
import { NationData, RegionData, ZoneData, DataBase } from "../../models/data";
import { ThrowStmt } from "@angular/compiler";

interface Serie {
  valueField: string;
  name: string;
}

interface GroupedData {
  [data: string]: (NationData | RegionData | ZoneData)[];
}

export interface MainChartComponentInput {
  countries: number[];
  regions: number[];
  zones: number[];
  reload: boolean;
  showActive: boolean;
  showTotal: boolean;
  showDeads: boolean;
  showHealed: boolean;
}

@Component({
  selector: "app-main-chart",
  templateUrl: "./main-chart.component.html",
  styleUrls: ["./main-chart.component.scss"],
})
export class MainChartComponent implements OnInit {
  types: string[] = ["spline", "stackedspline", "fullstackedspline"];
  nationalData: (NationData | RegionData | ZoneData)[];
  chartTitle: string;
  series: Serie[];

  showActive: boolean;
  showTotal: boolean;
  showDeads: boolean;
  showHealed: boolean;

  @Input()
  set input(i: MainChartComponentInput) {
    this.showActive = i.showActive;
    this.showTotal = i.showTotal;
    this.showDeads = i.showDeads;
    this.showHealed = i.showHealed;
    this.loadData(i);
  }

  constructor(private readonly service: MainService) {
    this.series = [];
    this.chartTitle = "Dati CoViD Italia";
  }

  ngOnInit() {}

  loadData(i: MainChartComponentInput) {
    (i.regions || i.zones) && (this.chartTitle = "Dati CoViD per zone");
    i.countries && i.countries.length && this.getNationalData();
    (i.regions || i.zones) && (this.nationalData = []);
    (i.regions || i.zones) && (this.series = []);
    i.regions && this.getRegionalData(i.regions);
    i.zones && this.getZonelData(i.zones);
  }

  readonly totaleActives = "totale_positivi";
  readonly totaleCases = "totale_casi";
  readonly totaleHealed = "dimessi_guariti";
  readonly totaleDeads = "deceduti";

  getNationalData() {
    this.service.getDatiNazionale().then((d) => {
      this.nationalData = d;
      this.series = [];
      this.showActive &&
        this.series.push({
          name: "totale positivi",
          valueField: this.totaleActives,
        });
      this.showTotal &&
        this.series.push({
          name: "totale casi",
          valueField: this.totaleCases,
        });
      this.showHealed &&
        this.series.push({
          name: "dimessi_guariti",
          valueField: this.totaleHealed,
        });
      this.showDeads &&
        this.series.push({
          name: "deceduti",
          valueField: this.totaleDeads,
        });
    });
  }

  getRegionalData(ids: number[]) {
    this.service.getDatiRegione().then((d) => {
      d = d.filter((x) => ids.includes(x.codice_regione) && x.type === "r");
      const g = this.groupByDate(d);
      this.createChartDataAndSerie(g);
    });
  }

  getZonelData(ids: number[]) {
    this.service.getDatiProvince().then((d) => {
      d = d.filter((x) => ids.includes(x.codice_provincia) && x.type === "z");
      const g = this.groupByDate(d);
      this.createChartDataAndSerie(g);
    });
  }

  private createChartDataAndSerie(datag: GroupedData) {
    const seriesAppo: Serie[] = [];
    const dataAppo = [];
    // tslint:disable-next-line: forin
    for (const data in datag) {
      var item = {};
      const values = datag[data];
      values.forEach((value) => {
        let actives = "";
        let total = "";
        let healed = "";
        let deads = "";
        if (value.type === "r") {
          const vt = value as RegionData;
          item["data"] = new Date(data);
          actives = this.totaleActives + "_" + vt.denominazione_regione;
          total = this.totaleCases + "_" + vt.denominazione_regione;
          healed = this.totaleHealed + "_" + vt.denominazione_regione;
          deads = this.totaleDeads + "_" + vt.denominazione_regione;
          item[actives] = vt.totale_positivi;
          item[total] = vt.totale_casi;
          item[healed] = vt.dimessi_guariti;
          item[deads] = vt.deceduti;
        }

        if (value.type === "z") {
          const vt = value as ZoneData;
          item["data"] = data;
          total = this.totaleCases + "_" + vt.denominazione_provincia;
          item[total] = vt.totale_casi;
        }

        if (
          this.showActive &&
          actives &&
          !seriesAppo.find((s) => s.valueField === actives)
        ) {
          seriesAppo.push({
            name: actives,
            valueField: actives,
          });
        }

        if (
          this.showTotal &&
          total &&
          !seriesAppo.find((s) => s.valueField === total)
        ) {
          seriesAppo.push({
            name: total,
            valueField: total,
          });
        }

        if (
          this.showHealed &&
          healed &&
          !seriesAppo.find((s) => s.valueField === healed)
        ) {
          seriesAppo.push({
            name: healed,
            valueField: healed,
          });
        }

        if (
          this.showDeads &&
          deads &&
          !seriesAppo.find((s) => s.valueField === deads)
        ) {
          seriesAppo.push({
            name: deads,
            valueField: deads,
          });
        }
      });
      dataAppo.push(item);
    }

    dataAppo &&
      dataAppo.length &&
      (this.nationalData = this.nationalData.concat(dataAppo));
    seriesAppo &&
      seriesAppo.length &&
      (this.series = this.series.concat(seriesAppo));
  }

  private groupByDate(d: DataBase[]): GroupedData {
    const groupBy = (key) => (array) =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const groupByData = groupBy("data");

    return groupByData(d);
  }
}
