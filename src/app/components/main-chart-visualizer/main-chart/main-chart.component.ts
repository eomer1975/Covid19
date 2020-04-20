import { Component, OnInit, Input } from "@angular/core";
import { MainService } from "../../../services/main.service";
import {
  NationData,
  RegionData,
  ZoneData,
  DataBase,
  Note,
} from "../../../models/data";
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
  showSwabs: boolean;
  dateFrom: Date;
  dateTo: Date;
}

@Component({
  selector: "app-main-chart",
  templateUrl: "./main-chart.component.html",
  styleUrls: ["./main-chart.component.scss"],
})
export class MainChartComponent implements OnInit {
  types: string[] = ["spline", "stackedspline", "fullstackedspline"];
  nationalData: (NationData | RegionData | ZoneData)[];
  notes: Note[];
  chartTitle: string;
  series: Serie[];

  showActive: boolean;
  showTotal: boolean;
  showDeads: boolean;
  showHealed: boolean;
  showSwabs: boolean;

  dateFrom: Date;
  dateTo: Date;

  @Input()
  set input(i: MainChartComponentInput) {
    this.showActive = i.showActive;
    this.showTotal = i.showTotal;
    this.showDeads = i.showDeads;
    this.showHealed = i.showHealed;
    this.showSwabs = i.showSwabs;
    this.dateFrom = i.dateFrom;
    this.dateTo = i.dateTo;
    this.loadData(i);
  }

  constructor(private readonly service: MainService) {
    this.series = [];
    this.chartTitle = "Dati CoViD Italia";
  }

  ngOnInit() {}

  loadNotes() {
    this.service.getNote().then((d) => {
      this.notes = d;
    });
  }

  loadData(i: MainChartComponentInput) {
    this.loadNotes();
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
  readonly totaleSwabs = "tamponi";

  getNationalData() {
    this.service.getDatiNazionale().then((d) => {
      let actives = "";
      let total = "";
      let healed = "";
      let deads = "";
      let swabs = "";
      d.forEach((vt) => {
        actives = this.totaleActives + "_" + vt.stato;
        total = this.totaleCases + "_" + vt.stato;
        healed = this.totaleHealed + "_" + vt.stato;
        deads = this.totaleDeads + "_" + vt.stato;
        swabs = this.totaleSwabs + "_" + vt.stato;
        vt[actives] = vt.totale_positivi;
        vt[total] = vt.totale_casi;
        vt[healed] = vt.dimessi_guariti;
        vt[deads] = vt.deceduti;
        vt[swabs] = vt.tamponi;
      });

      this.nationalData = d;
      this.dateFrom &&
        (this.nationalData = this.nationalData.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateFrom)) >= 0
        ));

      this.dateTo &&
        (this.nationalData = this.nationalData.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateTo)) <= 0
        ));

      this.series = [];
      this.showActive &&
        this.series.push({
          name: "totale positivi",
          valueField: actives,
        });
      this.showTotal &&
        this.series.push({
          name: "totale casi",
          valueField: total,
        });
      this.showHealed &&
        this.series.push({
          name: "dimessi_guariti",
          valueField: healed,
        });
      this.showDeads &&
        this.series.push({
          name: "deceduti",
          valueField: deads,
        });

      this.showSwabs &&
        this.series.push({
          name: "tamponi",
          valueField: swabs,
        });
    });
  }

  getRegionalData(ids: number[]) {
    this.service.getDatiRegione().then((d) => {
      this.dateFrom &&
        (d = d.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateFrom)) >= 0
        ));

      this.dateTo &&
        (d = d.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateTo)) <= 0
        ));
      d = d.filter((x) => ids.includes(x.codice_regione) && x.type === "r");
      const g = this.groupByDate(d);
      this.createChartDataAndSerie(g);
    });
  }

  getZonelData(ids: number[]) {
    this.service.getDatiProvince().then((d) => {
      this.dateFrom &&
        (d = d.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateFrom)) >= 0
        ));

      this.dateTo &&
        (d = d.filter(
          (x) =>
            this.confrontDates(new Date(x.data), new Date(this.dateTo)) <= 0
        ));
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
      const dateAppo = new Date(data);

      var item = {};
      const values = datag[data];
      values.forEach((value) => {
        let actives = "";
        let total = "";
        let healed = "";
        let deads = "";
        let swabs = "";
        if (value.type === "r") {
          const vt = value as RegionData;
          item["data"] = new Date(data);
          actives = this.totaleActives + "_" + vt.denominazione_regione;
          total = this.totaleCases + "_" + vt.denominazione_regione;
          healed = this.totaleHealed + "_" + vt.denominazione_regione;
          deads = this.totaleDeads + "_" + vt.denominazione_regione;
          swabs = this.totaleSwabs + "_" + vt.denominazione_regione;
          item[actives] = vt.totale_positivi;
          item[total] = vt.totale_casi;
          item[healed] = vt.dimessi_guariti;
          item[deads] = vt.deceduti;
          item[swabs] = vt.tamponi;
          Object.assign(item, vt);
          // item["isolamento_domiciliare"] = vt.isolamento_domiciliare;
          // item["terapia_intensiva"] = vt.terapia_intensiva;
          // item["totale_ospedalizzati"] = vt.totale_ospedalizzati;
          // item["variazione_totale_positivi"] = vt.variazione_totale_positivi;
          // item["nuovi_positivi"] = vt.nuovi_positivi;
        }

        if (value.type === "z") {
          const vt = value as ZoneData;
          item["data"] = data;
          total = this.totaleCases + "_" + vt.denominazione_provincia;
          item[total] = vt.totale_casi;
          Object.assign(item, vt);
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

        if (
          this.showSwabs &&
          deads &&
          !seriesAppo.find((s) => s.valueField === swabs)
        ) {
          seriesAppo.push({
            name: swabs,
            valueField: swabs,
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

  get chartWidth() {
    return window.innerWidth * 0.8;
  }

  confrontDates(date1: Date, date2: Date) {
    const dateAppo1 = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    ).getTime();
    const dateAppo2 = new Date(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    ).getTime();
    let res = -1;
    if (dateAppo1 === dateAppo2) res = 0;
    if (dateAppo1 > dateAppo2) res = 1;

    console.log(date1, date2, res);
    return res;
  }

  getNote(id: string) {
    const n = this.notes.find((x) => x.codice === id);
    if (!n) {
      return id;
    }
    return n.note + " (" + n.tipologia_avviso + ")";
  }
}
