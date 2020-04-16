export class DataBase {
  data: Date;
  stato: "ITA";
  lat: number;
  long: number;
  totale_casi: number;
  note_it: string;
  note_en: string;
  type: "n" | "r" | "z";
}

// https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json
export class NationData extends DataBase {
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  tamponi: number;
}

// https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json
export class ZoneData extends DataBase {
  codice_regione: number;
  denominazione_regione: string;
  codice_provincia: number;
  denominazione_provincia: string;
  sigla_provincia: string;
}

// https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json
export class RegionData extends DataBase {
  codice_regione: number;
  denominazione_regione: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  tamponi: number;
}

// https://github.com/pcm-dpc/COVID-19/blob/master/dati-json/dpc-covid19-ita-note-it.json
export class Note {
  codice: string;
  data: Date;
  dataset: string;
  stato: "ITA";
  codice_regione: number;
  regione: string;
  codice_provincia: number;
  provincia: string;
  sigla_provincia: string;
  tipologia_avviso: string;
  avviso: string;
  note: string;
}
