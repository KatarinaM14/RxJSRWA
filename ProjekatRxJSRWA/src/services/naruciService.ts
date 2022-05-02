import { debounceTime, fromEvent, map, merge, Observable } from "rxjs";
import { Higijena } from "../models/higijena";
import { Hrana } from "../models/hrana";
import { Lokacija } from "../models/lokacija";
import { Pice } from "../models/pice";
import { NaruciPrikaz } from "../Prikaz/naruciPrikaz";
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

    kupi(naruci: NaruciPrikaz, host: HTMLElement) {
        merge(
            this.hranaObservable.pipe(map((hrana) => naruci.naruciHranu(hrana))),
            this.piceObservable.pipe(map((pice) => naruci.naruciPice(pice))),
            this.higijenaObservable.pipe(map((higijena) => naruci.naruciHigijenu(higijena))),
            this.lokacijaObservable.pipe(map((lokacija) => naruci.dodajLokaciju(lokacija)))
        ).subscribe(() => naruci.prikaziNarudzbinu(host));
    }


   
}