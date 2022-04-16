import { LokacijaService } from "../services/lokacijaService";
import { NaruciService } from "../services/naruciService";

export class LokacijaPrikaz{
    lokacijaService: LokacijaService;

    constructor(){
        this.lokacijaService = new LokacijaService();
    }

    prikazLokacije(host: HTMLElement, naruci: NaruciService) {
        const lokacijaDiv = document.createElement("div");
        lokacijaDiv.className = "LokacijaDiv";

        const lokacijaLbl = document.createElement("label");
        lokacijaLbl.innerHTML = "Unesite lokaciju";
        lokacijaLbl.className = "LokacijaLbl";
        lokacijaDiv.appendChild(lokacijaLbl);

        const inputLokacija= document.createElement("input");
        inputLokacija.className = "LokacijaInput";
        inputLokacija.type = "text";
        lokacijaDiv.appendChild(inputLokacija);

        naruci.kreirajLokacijaObservable(inputLokacija);

        host.appendChild(lokacijaDiv);

    }
}