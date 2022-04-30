import { fromEvent } from "rxjs";
import { Higijena } from "../models/higijena";
import { Hrana } from "../models/hrana";
import { Lokacija } from "../models/lokacija";
import { Pice } from "../models/pice";

export class NaruciPrikaz{

    hrana: Hrana;
    pice: Pice;
    higijena: Higijena;
    lokacija: Lokacija;
    cenaHrane: number;
    cenaHigijene: number;
    cenaPica: number;


    constructor() {
        this.cenaHrane = 0;
        this.cenaHigijene = 0;
        this.cenaPica = 0;
    }

    naruciHranu(hrana: Hrana) {
            this.hrana = hrana;
            this.postaviCenu();
    }

    naruciPice(pice: Pice) {
        this.pice = pice;
        this.postaviCenu();
    }

    naruciHigijenu(higijena: Higijena){
        this.higijena = higijena;
        this.postaviCenu();
    }

    dodajLokaciju(lokacija: Lokacija){
        this.lokacija = lokacija;
    }

    postaviCenu(){
         this.cenaHrane = this.hrana ? this.hrana.cena : 0;
         this.cenaPica = this.pice ? this.pice.cena : 0;
         this.cenaHigijene = this.higijena ? this.higijena.cena : 0;

    }

    prikaziNarudzbinu(host: HTMLElement) {
        
        const prethodnaNarudzbina = host.getElementsByClassName("Narudzbina");
        var niz = Array.from(prethodnaNarudzbina);
        niz.forEach((element) =>{
            host.removeChild(element);
        });



        const kontejner = document.createElement("div");
        kontejner.className = "Narudzbina";
        host.appendChild(kontejner);

        const naslov = document.createElement("div");
        naslov.innerHTML = "Vasa narudzbina je:";
        naslov.className = "Naslov";
        kontejner.appendChild(naslov);


        this.hrana && this.prikaziHranu(kontejner);

        this.pice && this.prikaziPice(kontejner);

        this.higijena && this.prikaziHigijenu(kontejner);

        const cena = document.createElement("div");
        cena.innerHTML = `Cena poruzdbine je: ${
            Number.parseInt(this.cenaHrane.toString()) +
            Number.parseInt(this.cenaPica.toString()) +
            Number.parseInt(this.cenaHigijene.toString())
          }`;
          cena.className = "Cena";
          kontejner.appendChild(cena);

          this.lokacija && this.prikaziLokaciju(kontejner);

          this.refreshDugme(kontejner);

    }

    prikaziHranu(host: HTMLElement){

        const tipHrane = document.createElement("div");
        tipHrane.innerHTML = "Hrana: " + this.hrana.tip;
        tipHrane.className = "Hrana";
        host.appendChild(tipHrane);

        //const sadrzajHrane = document.createElement("label");
        //sadrzajHrane.innerHTML = "Sadrzaj: "+ this.hrana.

        const cenaHrane = document.createElement("div");
        cenaHrane.innerHTML = "Cena hrane: " + this.hrana.cena;
        cenaHrane.className = "CenaHrane";
        host.appendChild(cenaHrane);
    }

    prikaziPice(host: HTMLElement){
         const tipPica = document.createElement("div");
         tipPica.innerHTML = "Pice: " + this.pice.naziv;
         tipPica.className = "Pice";
         host.appendChild(tipPica);

         const cenaPica = document.createElement("div");
         cenaPica.innerHTML = "Cena pica: " +this.pice.cena;
         cenaPica.className = "CenaPica";
         host.appendChild(cenaPica);
    }


    prikaziHigijenu(host: HTMLElement) {
         const higijenaNaziv = document.createElement("div");
         higijenaNaziv.innerHTML = "Higijena: " + this.higijena.naziv;
         higijenaNaziv.className = "HigijenaNaziv";
         host.appendChild(higijenaNaziv);

         const higijenaCena = document.createElement("div");
         higijenaCena.innerHTML = "Cena higijenskog proizvoda: " + this.higijena.cena;
         higijenaCena.className = "HigijenaCena";
         host.appendChild(higijenaCena);
    }

    prikaziLokaciju(host: HTMLElement) {
          
        const nazivLokacije = document.createElement("div");
        nazivLokacije.innerHTML = "Vasa lokacija je: " + this.lokacija.lokacija;
        nazivLokacije.className = "Lokacija";
        host.appendChild(nazivLokacije);

        const vremeDostavljanja = document.createElement("div");
        vremeDostavljanja.innerHTML = "Vreme do stizanja narudzbine na vasu lokaciju: " + this.lokacija.vreme;
        vremeDostavljanja.className = "VremeDostavljanja";
        host.appendChild(vremeDostavljanja);
    }
    refreshDugme(host: HTMLElement) {
        const dugme = document.createElement("button");
        dugme.innerHTML = "Kupi";
        dugme.className = "dugmeKupi";
        host.appendChild(dugme);

        fromEvent(dugme, "click").subscribe(() => this.refreshKupovina());
    }

    refreshKupovina(){
        this.higijena = null;
        this.pice = null;
        this.hrana = null;
        this.lokacija = null;
        this.cenaHigijene = 0;
        this.cenaHrane =0;
        this.cenaPica = 0;
    }
}