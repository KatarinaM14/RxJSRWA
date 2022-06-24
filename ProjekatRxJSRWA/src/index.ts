import { HigijenaPrikaz } from "./Prikaz/higijenaPrikaz";
import { HranaPrikaz } from "./Prikaz/hranaPrikaz";
import { LokacijaPrikaz } from "./Prikaz/lokacijaPrikaz";
import { NaruciPrikaz } from "./Prikaz/naruciPrikaz";
import { PicePrikaz } from "./Prikaz/picePrikaz";
import { NaruciService } from "./services/naruciService";

const higijena = new HigijenaPrikaz();
const hrana = new HranaPrikaz();
const pice = new PicePrikaz();
const lokacija = new LokacijaPrikaz();
const naruci = new NaruciPrikaz();
const naruciService = new NaruciService();

let glavniDivNazivMarketa = document.createElement("div");
glavniDivNazivMarketa.className = "GlavniDivNazivMarketa";
document.body.appendChild(glavniDivNazivMarketa);
let lblNaslovMarketa = document.createElement("label");
lblNaslovMarketa.className = "LblNazivMarketa";
lblNaslovMarketa.innerHTML = "BeHuman online market";
lblNaslovMarketa.style.fontSize= "50px";
lblNaslovMarketa.style.color = "#51dbad";
glavniDivNazivMarketa.appendChild(lblNaslovMarketa);

let glavniDivHrana = document.createElement("div");
glavniDivHrana.className = "GlavniDivHrana";
document.body.appendChild(glavniDivHrana);
hrana.prikazHrane(glavniDivHrana, naruciService);

let glavniDivPice = document.createElement("div");
glavniDivPice.className = "GlavniDivPice";
document.body.appendChild(glavniDivPice);
pice.prikazPica(glavniDivPice, naruciService);

let glavniDivHigijena = document.createElement("div");
glavniDivHigijena.className = "GlavniDivHigijena";
document.body.appendChild(glavniDivHigijena);
higijena.prikazHigijene(glavniDivHigijena, naruciService);

let glavniDivLokacija = document.createElement("div");
glavniDivLokacija.className = "GlavniDivLokacija";
document.body.appendChild(glavniDivLokacija);
lokacija.prikazLokacije(glavniDivLokacija, naruciService);

let glavniDivPrikaz = document.createElement("div");
glavniDivPrikaz.className = "GlavniDivPrikaz";
document.body.appendChild(glavniDivPrikaz);

let glavniDivNaruci = document.createElement("div");
glavniDivNaruci.className = "GlavniDivNaruci";
glavniDivPrikaz.appendChild(glavniDivNaruci);
naruciService.kupi(naruci, glavniDivNaruci);
