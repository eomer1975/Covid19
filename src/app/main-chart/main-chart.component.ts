import { Component, OnInit, Input } from "@angular/core";
import { MainService } from "../services/main.service";
import { NationData, RegionData, ZoneData, DataBase } from "../models/data";
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
  @Input()
  set input(i: MainChartComponentInput) {
    this.loadData(i);
  }

  constructor(private readonly service: MainService) {
    this.series = [];
    this.chartTitle = "Dati CoViD Italia"
  }

  ngOnInit() {}

  loadData(i: MainChartComponentInput) {
    
    (i.regions || i.zones) && (this.chartTitle = "Dati CoViD per zone")
    i.countries && i.countries.length && this.getNationalData();
    (i.regions || i.zones) && (this.nationalData = []);
    (i.regions || i.zones) && (this.series = []);
    i.regions && this.getRegionalData(i.regions);
    i.zones && this.getZonelData(i.zones);
  }

  getNationalData() {
    this.service.getDatiNazionale().then((d) => {
      this.nationalData = d;
      this.series = [
        {
          name: "totale positivi",
          valueField: "totale_positivi",
        },
        {
          name: "totale casi",
          valueField: "totale_casi",
        },
      ];
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

  readonly totalePositivi = "totale_positivi";
  readonly totaleCasi = "totale_casi";

  private createChartDataAndSerie(datag: GroupedData) {
    const seriesAppo: Serie[] = [];
    const dataAppo = [];
    // tslint:disable-next-line: forin
    for (const data in datag) {
      var item = {};
      const values = datag[data];
      values.forEach((value) => {
        let positivi = "";
        let casi = "";
        if (value.type === "r") {
          const vt = value as RegionData;
          item["data"] = new Date(data);
          positivi = this.totalePositivi + "_" + vt.denominazione_regione;
          casi = this.totaleCasi + "_" + vt.denominazione_regione;
          item[positivi] = vt.totale_positivi;
          item[casi] = vt.totale_casi;
        }

        if (value.type === "z") {
          const vt = value as ZoneData;
          item["data"] = data;
          casi = this.totaleCasi + "_" + vt.denominazione_provincia;
          item[casi] = vt.totale_casi;
        }

        if (positivi && !seriesAppo.find((s) => s.valueField === positivi)) {
          seriesAppo.push({
            name: positivi,
            valueField: positivi,
          });
        }

        if (casi && !seriesAppo.find((s) => s.valueField === casi)) {
          seriesAppo.push({
            name: casi,
            valueField: casi,
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
