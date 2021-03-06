import { Component, OnInit, Output, EventEmitter } from "@angular/core";

interface administrativeArea {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  code?: string;
  parent?: number;
}

export interface FiltersComponentOutput {
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
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Output() output: EventEmitter<FiltersComponentOutput>;

  regions: administrativeArea[];
  zones: administrativeArea[];
  countries: administrativeArea[];

  showActiveEnabled: boolean;
  showTotalEnabled: boolean;
  showDeadsEnabled: boolean;
  showHealedEnabled: boolean;
  showSwabsEnabled: boolean;

  outputObj: FiltersComponentOutput;

  dateMin: Date;
  dateMax: Date;

  constructor() {
    this.output = new EventEmitter<FiltersComponentOutput>();
    this.regions = [];
    this.zones = [];
    this.countries = [];
    this.outputObj = {} as FiltersComponentOutput;
    this.setCountries();
    this.setRegions();
    this.setZones();
    this.outputObj.countries = [1];
    this.outputObj.showActive = true;
    this.outputObj.showTotal = true;
    this.outputObj.showDeads = false;
    this.outputObj.showHealed = false;
    this.outputObj.showSwabs = false;
    this.showActiveEnabled = true;
    this.showTotalEnabled = true;
    this.showDeadsEnabled = false;
    this.showHealedEnabled = false;
    this.showSwabsEnabled = false;
    this.dateMin=new Date(2020,1,1);
    this.dateMax=new Date();
  }

  ngOnInit() {}

  onCountrySelectionChanged(e) {
    this.output.emit(this.outputObj);
    this.setCheckboxEnabled();
  }

  onRegionsSelectionChanged(e) {
    this.output.emit(this.outputObj);
    this.setCheckboxEnabled();
  }

  onZonesSelectionChanged(e) {
    this.output.emit(this.outputObj);
    this.setCheckboxEnabled();
  }

  chbSerieTypeCHanged() {
    this.output.emit(this.outputObj);
  }

  dateChanged(e) {
    this.output.emit(this.outputObj);
  }
  resetDates(e){
    this.outputObj.dateFrom=null;
    this.outputObj.dateTo=null;
  }

  private compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  private setCheckboxEnabled() {
    const hasCountresOrRegion =
      !!(this.outputObj.countries && this.outputObj.countries.length) ||
      !!(this.outputObj.regions && this.outputObj.regions.length);
    this.showActiveEnabled = hasCountresOrRegion;
    this.showTotalEnabled = hasCountresOrRegion;
    this.showDeadsEnabled = hasCountresOrRegion;
    this.showHealedEnabled = hasCountresOrRegion;
    this.showSwabsEnabled = hasCountresOrRegion;

    !hasCountresOrRegion && (this.showTotalEnabled = true);
  }

  private setCountries() {
    this.countries = [
      {
        country: "ITA",
        id: 1,
        name: "Italia",
        latitude: 41.89277044,
        longitude: 12.48366722,
      },
    ];
  }

  private setRegions() {
    this.regions = [
      {
        country: "ITA",
        id: 13,
        name: "Abruzzo",
        latitude: 42.35122196,
        longitude: 13.39843823,
      },
      {
        country: "ITA",
        id: 17,
        name: "Basilicata",
        latitude: 40.63947052,
        longitude: 15.80514834,
      },
      {
        country: "ITA",
        id: 4,
        name: "P.A. Bolzano",
        latitude: 46.49933453,
        longitude: 11.35662422,
      },
      {
        country: "ITA",
        id: 18,
        name: "Calabria",
        latitude: 38.90597598,
        longitude: 16.59440194,
      },
      {
        country: "ITA",
        id: 15,
        name: "Campania",
        latitude: 40.83956555,
        longitude: 14.25084984,
      },
      {
        country: "ITA",
        id: 8,
        name: "Emilia-Romagna",
        latitude: 44.49436681,
        longitude: 11.3417208,
      },
      {
        country: "ITA",
        id: 6,
        name: "Friuli Venezia Giulia",
        latitude: 45.6494354,
        longitude: 13.76813649,
      },
      {
        country: "ITA",
        id: 12,
        name: "Lazio",
        latitude: 41.89277044,
        longitude: 12.48366722,
      },
      {
        country: "ITA",
        id: 7,
        name: "Liguria",
        latitude: 44.41149315,
        longitude: 8.9326992,
      },
      {
        country: "ITA",
        id: 3,
        name: "Lombardia",
        latitude: 45.46679409,
        longitude: 9.190347404,
      },
      {
        country: "ITA",
        id: 11,
        name: "Marche",
        latitude: 43.61675973,
        longitude: 13.5188753,
      },
      {
        country: "ITA",
        id: 14,
        name: "Molise",
        latitude: 41.55774754,
        longitude: 14.65916051,
      },
      {
        country: "ITA",
        id: 1,
        name: "Piemonte",
        latitude: 45.0732745,
        longitude: 7.680687483,
      },
      {
        country: "ITA",
        id: 16,
        name: "Puglia",
        latitude: 41.12559576,
        longitude: 16.86736689,
      },
      {
        country: "ITA",
        id: 20,
        name: "Sardegna",
        latitude: 39.21531192,
        longitude: 9.110616306,
      },
      {
        country: "ITA",
        id: 19,
        name: "Sicilia",
        latitude: 38.11569725,
        longitude: 13.3623567,
      },
      {
        country: "ITA",
        id: 9,
        name: "Toscana",
        latitude: 43.76923077,
        longitude: 11.25588885,
      },
      {
        country: "ITA",
        id: 4,
        name: "P.A. Trento",
        latitude: 46.6893511,
        longitude: 11.12123097,
      },
      {
        country: "ITA",
        id: 10,
        name: "Umbria",
        latitude: 43.10675841,
        longitude: 12.38824698,
      },
      {
        country: "ITA",
        id: 2,
        name: "Valle d'Aosta",
        latitude: 45.73750286,
        longitude: 7.320149366,
      },
      {
        country: "ITA",
        id: 5,
        name: "Veneto",
        latitude: 45.43490485,
        longitude: 12.33845213,
      },
    ].sort(this.compare);
  }

  setZones() {
    this.zones = [
      {
        country: "ITA",
        parent: 13,
        id: 69,
        name: "Chieti",
        code: "CH",
        latitude: 42.35103167,
        longitude: 14.16754574,
      },
      {
        country: "ITA",
        parent: 13,
        id: 66,
        name: "L'Aquila",
        code: "AQ",
        latitude: 42.35122196,
        longitude: 13.39843823,
      },
      {
        country: "ITA",
        parent: 13,
        id: 68,
        name: "Pescara",
        code: "PE",
        latitude: 42.46458398,
        longitude: 14.21364822,
      },
      {
        country: "ITA",
        parent: 13,
        id: 67,
        name: "Teramo",
        code: "TE",
        latitude: 42.6589177,
        longitude: 13.70439971,
      },
      {
        country: "ITA",
        parent: 13,
        id: 979,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 17,
        id: 77,
        name: "Matera",
        code: "MT",
        latitude: 40.66751177,
        longitude: 16.59792442,
      },
      {
        country: "ITA",
        parent: 17,
        id: 76,
        name: "Potenza",
        code: "PZ",
        latitude: 40.63947052,
        longitude: 15.80514834,
      },
      {
        country: "ITA",
        parent: 17,
        id: 980,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 4,
        id: 21,
        name: "Bolzano",
        code: "BZ",
        latitude: 46.49933453,
        longitude: 11.35662422,
      },
      {
        country: "ITA",
        parent: 4,
        id: 981,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 18,
        id: 79,
        name: "Catanzaro",
        code: "CZ",
        latitude: 38.90597598,
        longitude: 16.59440194,
      },
      {
        country: "ITA",
        parent: 18,
        id: 78,
        name: "Cosenza",
        code: "CS",
        latitude: 39.29308681,
        longitude: 16.25609692,
      },
      {
        country: "ITA",
        parent: 18,
        id: 101,
        name: "Crotone",
        code: "KR",
        latitude: 39.08036878,
        longitude: 17.12538864,
      },
      {
        country: "ITA",
        parent: 18,
        id: 80,
        name: "Reggio di Calabria",
        code: "RC",
        latitude: 38.10922769,
        longitude: 15.6434527,
      },
      {
        country: "ITA",
        parent: 18,
        id: 102,
        name: "Vibo Valentia",
        code: "VV",
        latitude: 38.67624147,
        longitude: 16.10157414,
      },
      {
        country: "ITA",
        parent: 18,
        id: 982,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 15,
        id: 64,
        name: "Avellino",
        code: "AV",
        latitude: 40.91404699,
        longitude: 14.79528803,
      },
      {
        country: "ITA",
        parent: 15,
        id: 62,
        name: "Benevento",
        code: "BN",
        latitude: 41.12969987,
        longitude: 14.78151683,
      },
      {
        country: "ITA",
        parent: 15,
        id: 61,
        name: "Caserta",
        code: "CE",
        latitude: 41.07465878,
        longitude: 14.33240464,
      },
      {
        country: "ITA",
        parent: 15,
        id: 63,
        name: "Napoli",
        code: "NA",
        latitude: 40.83956555,
        longitude: 14.25084984,
      },
      {
        country: "ITA",
        parent: 15,
        id: 65,
        name: "Salerno",
        code: "SA",
        latitude: 40.67821961,
        longitude: 14.7594026,
      },
      {
        country: "ITA",
        parent: 15,
        id: 983,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 8,
        id: 37,
        name: "Bologna",
        code: "BO",
        latitude: 44.49436681,
        longitude: 11.3417208,
      },
      {
        country: "ITA",
        parent: 8,
        id: 38,
        name: "Ferrara",
        code: "FE",
        latitude: 44.83599085,
        longitude: 11.61868934,
      },
      {
        country: "ITA",
        parent: 8,
        id: 40,
        name: "ForlÃ¬-Cesena",
        code: "FC",
        latitude: 44.22268559,
        longitude: 12.04068608,
      },
      {
        country: "ITA",
        parent: 8,
        id: 36,
        name: "Modena",
        code: "MO",
        latitude: 44.64600009,
        longitude: 10.92615487,
      },
      {
        country: "ITA",
        parent: 8,
        id: 34,
        name: "Parma",
        code: "PR",
        latitude: 44.80107394,
        longitude: 10.32834985,
      },
      {
        country: "ITA",
        parent: 8,
        id: 33,
        name: "Piacenza",
        code: "PC",
        latitude: 45.05193462,
        longitude: 9.692632596,
      },
      {
        country: "ITA",
        parent: 8,
        id: 39,
        name: "Ravenna",
        code: "RA",
        latitude: 44.41722493,
        longitude: 12.19913936,
      },
      {
        country: "ITA",
        parent: 8,
        id: 35,
        name: "Reggio nell'Emilia",
        code: "RE",
        latitude: 44.69735289,
        longitude: 10.63007973,
      },
      {
        country: "ITA",
        parent: 8,
        id: 99,
        name: "Rimini",
        code: "RN",
        latitude: 44.06090087,
        longitude: 12.5656295,
      },
      {
        country: "ITA",
        parent: 8,
        id: 984,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 6,
        id: 31,
        name: "Gorizia",
        code: "GO",
        latitude: 45.94149817,
        longitude: 13.62212502,
      },
      {
        country: "ITA",
        parent: 6,
        id: 93,
        name: "Pordenone",
        code: "PN",
        latitude: 45.95443546,
        longitude: 12.66002909,
      },
      {
        country: "ITA",
        parent: 6,
        id: 32,
        name: "Trieste",
        code: "TS",
        latitude: 45.6494354,
        longitude: 13.76813649,
      },
      {
        country: "ITA",
        parent: 6,
        id: 30,
        name: "Udine",
        code: "UD",
        latitude: 46.06255516,
        longitude: 13.2348383,
      },
      {
        country: "ITA",
        parent: 6,
        id: 985,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 12,
        id: 60,
        name: "Frosinone",
        code: "FR",
        latitude: 41.63964569,
        longitude: 13.35117161,
      },
      {
        country: "ITA",
        parent: 12,
        id: 59,
        name: "Latina",
        code: "LT",
        latitude: 41.46759465,
        longitude: 12.90368482,
      },
      {
        country: "ITA",
        parent: 12,
        id: 57,
        name: "Rieti",
        code: "RI",
        latitude: 42.40488444,
        longitude: 12.86205939,
      },
      {
        country: "ITA",
        parent: 12,
        id: 58,
        name: "Roma",
        code: "RM",
        latitude: 41.89277044,
        longitude: 12.48366722,
      },
      {
        country: "ITA",
        parent: 12,
        id: 56,
        name: "Viterbo",
        code: "VT",
        latitude: 42.4173828,
        longitude: 12.10473416,
      },
      {
        country: "ITA",
        parent: 12,
        id: 986,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 7,
        id: 10,
        name: "Genova",
        code: "GE",
        latitude: 44.41149314,
        longitude: 8.9326992,
      },
      {
        country: "ITA",
        parent: 7,
        id: 8,
        name: "Imperia",
        code: "IM",
        latitude: 43.88570648,
        longitude: 8.027850298,
      },
      {
        country: "ITA",
        parent: 7,
        id: 11,
        name: "La Spezia",
        code: "SP",
        latitude: 44.10704991,
        longitude: 9.8281897,
      },
      {
        country: "ITA",
        parent: 7,
        id: 9,
        name: "Savona",
        code: "SV",
        latitude: 44.30750461,
        longitude: 8.481108654,
      },
      {
        country: "ITA",
        parent: 7,
        id: 987,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 3,
        id: 16,
        name: "Bergamo",
        code: "BG",
        latitude: 45.69441368,
        longitude: 9.668424528,
      },
      {
        country: "ITA",
        parent: 3,
        id: 17,
        name: "Brescia",
        code: "BS",
        latitude: 45.53993052,
        longitude: 10.21910323,
      },
      {
        country: "ITA",
        parent: 3,
        id: 13,
        name: "Como",
        code: "CO",
        latitude: 45.8099912,
        longitude: 9.085159546,
      },
      {
        country: "ITA",
        parent: 3,
        id: 19,
        name: "Cremona",
        code: "CR",
        latitude: 45.13336675,
        longitude: 10.02420865,
      },
      {
        country: "ITA",
        parent: 3,
        id: 97,
        name: "Lecco",
        code: "LC",
        latitude: 45.85575781,
        longitude: 9.393392246,
      },
      {
        country: "ITA",
        parent: 3,
        id: 98,
        name: "Lodi",
        code: "LO",
        latitude: 45.31440693,
        longitude: 9.503720769,
      },
      {
        country: "ITA",
        parent: 3,
        id: 20,
        name: "Mantova",
        code: "MN",
        latitude: 45.15726772,
        longitude: 10.79277363,
      },
      {
        country: "ITA",
        parent: 3,
        id: 15,
        name: "Milano",
        code: "MI",
        latitude: 45.46679409,
        longitude: 9.190347404,
      },
      {
        country: "ITA",
        parent: 3,
        id: 108,
        name: "Monza e della Brianza",
        code: "MB",
        latitude: 45.58439043,
        longitude: 9.273582472,
      },
      {
        country: "ITA",
        parent: 3,
        id: 18,
        name: "Pavia",
        code: "PV",
        latitude: 45.18509264,
        longitude: 9.160157191,
      },
      {
        country: "ITA",
        parent: 3,
        id: 14,
        name: "Sondrio",
        code: "SO",
        latitude: 46.17099261,
        longitude: 9.87147489,
      },
      {
        country: "ITA",
        parent: 3,
        id: 12,
        name: "Varese",
        code: "VA",
        latitude: 45.81701677,
        longitude: 8.822868344,
      },
      {
        country: "ITA",
        parent: 3,
        id: 988,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 11,
        id: 42,
        name: "Ancona",
        code: "AN",
        latitude: 43.61675973,
        longitude: 13.5188753,
      },
      {
        country: "ITA",
        parent: 11,
        id: 44,
        name: "Ascoli Piceno",
        code: "AP",
        latitude: 42.85322304,
        longitude: 13.57691127,
      },
      {
        country: "ITA",
        parent: 11,
        id: 109,
        name: "Fermo",
        code: "FM",
        latitude: 43.16058534,
        longitude: 13.71839535,
      },
      {
        country: "ITA",
        parent: 11,
        id: 43,
        name: "Macerata",
        code: "MC",
        latitude: 43.30023926,
        longitude: 13.45307182,
      },
      {
        country: "ITA",
        parent: 11,
        id: 41,
        name: "Pesaro e Urbino",
        code: "PU",
        latitude: 43.91014021,
        longitude: 12.91345989,
      },
      {
        country: "ITA",
        parent: 11,
        id: 989,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 14,
        id: 70,
        name: "Campobasso",
        code: "CB",
        latitude: 41.55774754,
        longitude: 14.65916051,
      },
      {
        country: "ITA",
        parent: 14,
        id: 94,
        name: "Isernia",
        code: "IS",
        latitude: 41.58800826,
        longitude: 14.22575407,
      },
      {
        country: "ITA",
        parent: 14,
        id: 990,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 1,
        id: 6,
        name: "Alessandria",
        code: "AL",
        latitude: 44.91297351,
        longitude: 8.615401155,
      },
      {
        country: "ITA",
        parent: 1,
        id: 5,
        name: "Asti",
        code: "AT",
        latitude: 44.89912921,
        longitude: 8.204142547,
      },
      {
        country: "ITA",
        parent: 1,
        id: 96,
        name: "Biella",
        code: "BI",
        latitude: 45.5665112,
        longitude: 8.054082167,
      },
      {
        country: "ITA",
        parent: 1,
        id: 4,
        name: "Cuneo",
        code: "CN",
        latitude: 44.39329625,
        longitude: 7.551171632,
      },
      {
        country: "ITA",
        parent: 1,
        id: 3,
        name: "Novara",
        code: "NO",
        latitude: 45.44588506,
        longitude: 8.621915884,
      },
      {
        country: "ITA",
        parent: 1,
        id: 1,
        name: "Torino",
        code: "TO",
        latitude: 45.0732745,
        longitude: 7.680687483,
      },
      {
        country: "ITA",
        parent: 1,
        id: 103,
        name: "Verbano-Cusio-Ossola",
        code: "VB",
        latitude: 45.9214455,
        longitude: 8.551078753,
      },
      {
        country: "ITA",
        parent: 1,
        id: 2,
        name: "Vercelli",
        code: "VC",
        latitude: 45.32398135,
        longitude: 8.423234312,
      },
      {
        country: "ITA",
        parent: 1,
        id: 991,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 16,
        id: 72,
        name: "Bari",
        code: "BA",
        latitude: 41.12559576,
        longitude: 16.86736689,
      },
      {
        country: "ITA",
        parent: 16,
        id: 110,
        name: "Barletta-Andria-Trani",
        code: "BT",
        latitude: 41.22705039,
        longitude: 16.29520432,
      },
      {
        country: "ITA",
        parent: 16,
        id: 74,
        name: "Brindisi",
        code: "BR",
        latitude: 40.63848545,
        longitude: 17.94601575,
      },
      {
        country: "ITA",
        parent: 16,
        id: 71,
        name: "Foggia",
        code: "FG",
        latitude: 41.46226865,
        longitude: 15.54305094,
      },
      {
        country: "ITA",
        parent: 16,
        id: 75,
        name: "Lecce",
        code: "LE",
        latitude: 40.35354285,
        longitude: 18.1718973,
      },
      {
        country: "ITA",
        parent: 16,
        id: 73,
        name: "Taranto",
        code: "TA",
        latitude: 40.47354739,
        longitude: 17.23237181,
      },
      {
        country: "ITA",
        parent: 16,
        id: 992,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 20,
        id: 92,
        name: "Cagliari",
        code: "CA",
        latitude: 39.21531192,
        longitude: 9.110616306,
      },
      {
        country: "ITA",
        parent: 20,
        id: 91,
        name: "Nuoro",
        code: "NU",
        latitude: 40.32318834,
        longitude: 9.330296393,
      },
      {
        country: "ITA",
        parent: 20,
        id: 95,
        name: "Oristano",
        code: "OR",
        latitude: 39.90381075,
        longitude: 8.591183151,
      },
      {
        country: "ITA",
        parent: 20,
        id: 90,
        name: "Sassari",
        code: "SS",
        latitude: 40.72667657,
        longitude: 8.559667131,
      },
      {
        country: "ITA",
        parent: 20,
        id: 111,
        name: "Sud Sardegna",
        code: "SU",
        latitude: 39.16641462,
        longitude: 8.526242676,
      },
      {
        country: "ITA",
        parent: 20,
        id: 993,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 19,
        id: 84,
        name: "Agrigento",
        code: "AG",
        latitude: 37.30971088,
        longitude: 13.5845749,
      },
      {
        country: "ITA",
        parent: 19,
        id: 85,
        name: "Caltanissetta",
        code: "CL",
        latitude: 37.49213171,
        longitude: 14.06184973,
      },
      {
        country: "ITA",
        parent: 19,
        id: 87,
        name: "Catania",
        code: "CT",
        latitude: 37.50287803,
        longitude: 15.08704691,
      },
      {
        country: "ITA",
        parent: 19,
        id: 86,
        name: "Enna",
        code: "EN",
        latitude: 37.56705701,
        longitude: 14.27909375,
      },
      {
        country: "ITA",
        parent: 19,
        id: 83,
        name: "Messina",
        code: "ME",
        latitude: 38.19395845,
        longitude: 15.55572302,
      },
      {
        country: "ITA",
        parent: 19,
        id: 82,
        name: "Palermo",
        code: "PA",
        latitude: 38.11569725,
        longitude: 13.3623567,
      },
      {
        country: "ITA",
        parent: 19,
        id: 88,
        name: "Ragusa",
        code: "RG",
        latitude: 36.92509198,
        longitude: 14.73069891,
      },
      {
        country: "ITA",
        parent: 19,
        id: 89,
        name: "Siracusa",
        code: "SR",
        latitude: 37.05991687,
        longitude: 15.29333182,
      },
      {
        country: "ITA",
        parent: 19,
        id: 81,
        name: "Trapani",
        code: "TP",
        latitude: 38.01850065,
        longitude: 12.51365684,
      },
      {
        country: "ITA",
        parent: 19,
        id: 994,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 9,
        id: 51,
        name: "Arezzo",
        code: "AR",
        latitude: 43.46642752,
        longitude: 11.88228844,
      },
      {
        country: "ITA",
        parent: 9,
        id: 48,
        name: "Firenze",
        code: "FI",
        latitude: 43.76923077,
        longitude: 11.25588885,
      },
      {
        country: "ITA",
        parent: 9,
        id: 53,
        name: "Grosseto",
        code: "GR",
        latitude: 42.76026758,
        longitude: 11.11356398,
      },
      {
        country: "ITA",
        parent: 9,
        id: 49,
        name: "Livorno",
        code: "LI",
        latitude: 43.55234873,
        longitude: 10.3086781,
      },
      {
        country: "ITA",
        parent: 9,
        id: 46,
        name: "Lucca",
        code: "LU",
        latitude: 43.84432283,
        longitude: 10.50151366,
      },
      {
        country: "ITA",
        parent: 9,
        id: 45,
        name: "Massa Carrara",
        code: "MS",
        latitude: 44.03674425,
        longitude: 10.14173829,
      },
      {
        country: "ITA",
        parent: 9,
        id: 50,
        name: "Pisa",
        code: "PI",
        latitude: 43.71553206,
        longitude: 10.40127259,
      },
      {
        country: "ITA",
        parent: 9,
        id: 47,
        name: "Pistoia",
        code: "PT",
        latitude: 43.933465,
        longitude: 10.91734146,
      },
      {
        country: "ITA",
        parent: 9,
        id: 100,
        name: "Prato",
        code: "PO",
        latitude: 43.88062274,
        longitude: 11.09703315,
      },
      {
        country: "ITA",
        parent: 9,
        id: 52,
        name: "Siena",
        code: "SI",
        latitude: 43.31816374,
        longitude: 11.33190988,
      },
      {
        country: "ITA",
        parent: 9,
        id: 995,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 4,
        id: 22,
        name: "Trento",
        code: "TN",
        latitude: 46.06893511,
        longitude: 11.12123097,
      },
      {
        country: "ITA",
        parent: 4,
        id: 996,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 10,
        id: 54,
        name: "Perugia",
        code: "PG",
        latitude: 43.10675841,
        longitude: 12.38824698,
      },
      {
        country: "ITA",
        parent: 10,
        id: 55,
        name: "Terni",
        code: "TR",
        latitude: 42.56071258,
        longitude: 12.6466875,
      },
      {
        country: "ITA",
        parent: 10,
        id: 997,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 2,
        id: 7,
        name: "Aosta",
        code: "AO",
        latitude: 45.73750286,
        longitude: 7.320149366,
      },
      {
        country: "ITA",
        parent: 2,
        id: 998,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
      {
        country: "ITA",
        parent: 5,
        id: 25,
        name: "Belluno",
        code: "BL",
        latitude: 46.13837528,
        longitude: 12.21704167,
      },
      {
        country: "ITA",
        parent: 5,
        id: 28,
        name: "Padova",
        code: "PD",
        latitude: 45.40692987,
        longitude: 11.87608718,
      },
      {
        country: "ITA",
        parent: 5,
        id: 29,
        name: "Rovigo",
        code: "RO",
        latitude: 45.07107289,
        longitude: 11.79007,
      },
      {
        country: "ITA",
        parent: 5,
        id: 26,
        name: "Treviso",
        code: "TV",
        latitude: 45.66754571,
        longitude: 12.24507363,
      },
      {
        country: "ITA",
        parent: 5,
        id: 27,
        name: "Venezia",
        code: "VE",
        latitude: 45.43490485,
        longitude: 12.33845213,
      },
      {
        country: "ITA",
        parent: 5,
        id: 23,
        name: "Verona",
        code: "VR",
        latitude: 45.43839046,
        longitude: 10.99352685,
      },
      {
        country: "ITA",
        parent: 5,
        id: 24,
        name: "Vicenza",
        code: "VI",
        latitude: 45.547497,
        longitude: 11.54597109,
      },
      {
        country: "ITA",
        parent: 5,
        id: 999,
        name: "In fase di definizione/aggiornamento",
        code: "",
        latitude: 0,
        longitude: 0,
      },
    ]
      .filter((z) => z.name !== "In fase di definizione/aggiornamento")
      .sort(this.compare);
  }
}
