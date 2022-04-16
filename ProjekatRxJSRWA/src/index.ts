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


hrana.prikazHrane(document.body, naruciService);
pice.prikazPica(document.body, naruciService);
higijena.prikazHigijene(document.body, naruciService);
lokacija.prikazLokacije(document.body, naruciService);