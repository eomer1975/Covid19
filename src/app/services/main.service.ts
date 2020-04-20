import { Injectable } from "@angular/core";
import { ServiceBase } from "../commons/service.base/service-base.service";
import { HttpClient } from "@angular/common/http";
import { NationData, ZoneData, RegionData, Note } from "../models/data";
import { DataConfig } from "../commons/data-config";

@Injectable({
  providedIn: "root",
})
export class MainService extends ServiceBase {
  _tryes = 0;
  _maxtryes = 5;
  constructor(private http2: HttpClient) {
    super(http2);
  }

  getDatiNazionale(): Promise<NationData[]> {
    const promise = super.get(DataConfig.datiNazionale, "GET", this.headers);

    return new Promise((resolve, reject) => {
      promise
        .then((response: NationData[]) => {
          const data = response;
          data.forEach((d) => {
            d.type = "n";
            d.data = new Date(d.data);
          });
          resolve(data);
        })
        .catch((ex) => {
          console.log("call failed", ex);
          reject(ex);
        });
    });
  }

  getDatiProvince(): Promise<ZoneData[]> {
    const promise = super.get(DataConfig.datiProvince, "GET", this.headers);

    return new Promise((resolve, reject) => {
      promise
        .then((response: ZoneData[]) => {
          const data = response;
          data.forEach((d) => (d.type = "z"));
          resolve(data);
        })
        .catch((ex) => {
          console.log("call failed", ex);
          reject(ex);
        });
    });
  }

  getDatiRegione(): Promise<RegionData[]> {
    const promise = super.get(DataConfig.datiRegioni, "GET", this.headers);

    return new Promise((resolve, reject) => {
      promise
        .then((response: RegionData[]) => {
          const data = response;
          data.forEach((d) => (d.type = "r"));
          resolve(data);
        })
        .catch((ex) => {
          console.log("call failed", ex);
          reject(ex);
        });
    });
  }

  getNote(): Promise<Note[]> {
    const promise = super.get(DataConfig.datiNote, "GET", this.headers);

    return new Promise((resolve, reject) => {
      promise
        .then((response: Note[]) => {
          const data = response;
          resolve(data);
        })
        .catch((ex) => {
          console.log("call failed", ex);
          reject(ex);
        });
    });
  }
}
