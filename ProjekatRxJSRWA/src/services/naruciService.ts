import { merge, Observable } from "rxjs";
import { Higijena } from "../models/higijena";
import { Hrana } from "../models/hrana";
import { Lokacija } from "../models/lokacija";
import { Pice } from "../models/pice";
import { HigijenaService } from "./higijenaService";
import { HranaService } from "./hranaService";
import { LokacijaService } from "./lokacijaService";
import { PiceService } from "./piceService";

export class NaruciService {
    hranaObservable: Observable<Hrana>;
    higijenaObservable: Observable<Higijena>;
    piceObservable: Observable<Pice>;
    lokacijaObservable: Observable<Lokacija>;
    hranaService: HranaService;
    higijenaService: HigijenaService;
    piceService: PiceService;
    lokacijaService: LokacijaService;


    constructor(){
        this.hranaService = new HranaService();
        this.higijenaService = new HigijenaService();
        this.piceService = new PiceService();
        this.lokacijaService = new LokacijaService();
    }

    kreirajHigijenaObservable(higijenaBtn: HTMLButtonElement){
        this.higijenaObservable = this.higijenaService.higijenaOnButtonClick(higijenaBtn);
    }

    kreirajHranaObservable(hranaBtn: HTMLButtonElement){
        this.hranaObservable = this.hranaService.hranaOnButtonClick(hranaBtn);
    }

    kreirajLokacijaObservable(inputLokacija: HTMLInputElement){
        this.lokacijaObservable = this.lokacijaService.lokacijaInput(inputLokacija);
    }

    kreirajPiceObservable(piceBtn: HTMLButtonElement){
        this.piceObservable = this.piceService.piceOnButtonClick(piceBtn);
    }
}