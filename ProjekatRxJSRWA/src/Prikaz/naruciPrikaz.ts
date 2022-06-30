import { debounceTime, delay, from, fromEvent, interval, map, of, reduce, take, takeUntil, zip } from "rxjs";
import { Higijena } from "../models/higijena";
import { Hrana } from "../models/hrana";
import { Lokacija } from "../models/lokacija";
import { Pice } from "../models/pice";
import { CONSTANTS } from "../constants";

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


        from([Number.parseInt(this.cenaHrane.toString()),  Number.parseInt(this.cenaPica.toString()),  Number.parseInt(this.cenaHigijene.toString())])
            .pipe(
                reduce((acc, val) => acc + val, 0)
        ).subscribe( sum => this.prikaziCenu(kontejner, sum));


    }

    prikaziCenu(host: HTMLElement, suma: number){
        console.log(suma);
        const cena = document.createElement("div");
        cena.innerHTML = `Cena poruzdbine je: ${
            suma
          }`;
          cena.className = "Cena";
          host.appendChild(cena);

          this.lokacija && this.prikaziLokaciju(host);

          this.refreshDugme(host);
    }

    prikaziHranu(host: HTMLElement){

        const tipHrane = document.createElement("div");
        tipHrane.innerHTML = "Hrana: " + this.hrana.naziv;
        tipHrane.className = "Hrana";
        host.appendChild(tipHrane);

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

        var vreme = this.lokacija.vreme.split(" ");
        var vr = parseInt(vreme[0]);
        console.log(vr);

        let narudzbinaDiv = document.querySelector(".Narudzbina");

        let glavniDivDonacija = document.querySelector(".GlavniDivPrikaz");
        
        let donacijaDiv = document.createElement("div");
        donacijaDiv.className = "DonacijaDiv";
        let lblDonacija = document.createElement("label");
        lblDonacija.className = "DonacijaLbl";
       // lblVreme.innerHTML = `${x}`;
        donacijaDiv.appendChild(lblDonacija);
        glavniDivDonacija.appendChild(donacijaDiv);

        let protekloVremeDiv = document.createElement("div");
        protekloVremeDiv.className = "ProtekloVremeDiv";
        let lblVreme = document.createElement("label");
        lblVreme.className = "ProtekloVremeLbl";
       // lblVreme.innerHTML = `${x}`;
        protekloVremeDiv.appendChild(lblVreme);
        narudzbinaDiv.appendChild(protekloVremeDiv);

        const hranaCena$ = of(this.hrana.cena);
        const piceCena$ = of(this.pice.cena);
        const higijrnaaCena$ = of(this.higijena.cena);
        
        zip(hranaCena$, piceCena$, higijrnaaCena$, fromEvent(dugme, "click")).pipe(
            map(([hranaCena, piceCena, higijenaCena, click]) =>
                 ((Number(hranaCena)+ Number(piceCena)+ Number(higijenaCena))/100)
                )
          ).subscribe(x =>{
            console.log(x); 
            console.log("Donirali ste kupovinom: " + x);
            this.donacija(x)
        });




        fromEvent(dugme, "click")
             .pipe(
              
            map(()=>  interval(60000).pipe(take(vr)).subscribe((x)=>this.protekloVremeOdNarudzbine(x+1))),
                delay(vr*60000),
             map(() => this.refreshKupovina()))
             .subscribe(() => this.obavestiKorisnikaODostavi());
    }

    protekloVremeOdNarudzbine(x : number){
        let lblVreme = document.querySelector(".ProtekloVremeLbl");

        lblVreme.innerHTML = "Protekao broj minuta od narudzbine: "+`${x}`;
    }

    donacija(donirano: number){
        console.log(donirano);

        let lblDonacija = document.querySelector(".DonacijaLbl");
        lblDonacija.innerHTML = "Ovom kupovinom ste donirali "+`${donirano}`+"% u humanitarne svrhe.";

        let donacijeDiv = document.querySelector(".DonacijaDiv");
        let slikaLogaDiv = document.createElement("div");
        slikaLogaDiv.className = "SlikaLogaDiv";
        donacijeDiv.appendChild(slikaLogaDiv);
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

    obavestiKorisnikaODostavi(){
           
        let porukaDiv = document.createElement("div");
        porukaDiv.className = "PorukaDiv";
        document.body.appendChild(porukaDiv);


       let lblPoruka1 = document.createElement("label");
       lblPoruka1.className = "LblPoruka";
       lblPoruka1.innerHTML = CONSTANTS.ISPORUCENA_KUPOVINA;
       porukaDiv.appendChild(lblPoruka1);

       let lblPoruka2 = document.createElement("label");
       lblPoruka2.className = "LblPoruka";
       lblPoruka2.innerHTML = CONSTANTS.OCENA_ISPORUKE;
       porukaDiv.appendChild(lblPoruka2);

        let porukaInput = document.createElement("input");
        porukaInput.className = "PorukaInput";
        porukaDiv.appendChild(porukaInput);



       

        fromEvent(porukaInput, "input")
                  .pipe(
                      debounceTime(500),
                      map((ev: InputEvent) =>(<HTMLInputElement>ev.target).value )
                  ).subscribe(poruka => this.ispitajPoruku(poruka));
    

 
    }

      ispitajPoruku(poruka: String){

        if(CONSTANTS.ZADOVOLJAN_ISKPORUKOM === poruka || CONSTANTS.ZADOVOLJNA_ISKPORUKOM === poruka){
            let porukaDiv = document.querySelector(".PorukaDiv");

            let poslednjaPoruka = document.createElement("label");
            poslednjaPoruka.className = "PoslednjaPoruka";
            poslednjaPoruka.innerHTML = CONSTANTS.ZADOVOLJAN_KUPOVINOM;//"Zadovoljni kupci su nas prioritet";
            porukaDiv.appendChild(poslednjaPoruka);
        }
        else if(CONSTANTS.NEZADOVOLJAN_ISKPORUKOM  == poruka || CONSTANTS.NEZADOVOLJNA_ISKPORUKOM == poruka){
            let porukaDiv = document.querySelector(".PorukaDiv");

            let poslednjaPoruka = document.createElement("label");
            poslednjaPoruka.className = "PoslednjaPoruka";
            poslednjaPoruka.innerHTML = CONSTANTS.UKAZITE_NAM_NA_PROBLEME;
            porukaDiv.appendChild(poslednjaPoruka);


            let porukaInput = document.createElement("input");
            porukaInput.className = "PorukaInput";
            porukaDiv.appendChild(porukaInput);

            fromEvent(porukaInput, "input")
            .pipe(
                debounceTime(5000),
                map((ev: InputEvent) =>(<HTMLInputElement>ev.target).value )
            ).subscribe(() => this.poslednjaPoruka());
        }
    }

    poslednjaPoruka() {
        let porukaDiv = document.querySelector(".PorukaDiv");
        let poslednjaPoruka = document.createElement("label");
        poslednjaPoruka.className = "PoslednjaPoruka";
        poslednjaPoruka.innerHTML = CONSTANTS.RAZMOTRICEMO_PRIMEDBE;
        porukaDiv.appendChild(poslednjaPoruka);
    }
}
 