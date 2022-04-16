import { HigijenaService } from "../services/higijenaService";
import { NaruciService } from "../services/naruciService";

export class HigijenaPrikaz{
    nazivHigijene = ["Colgate", "Rexona", "Nivea", "Dove"];
    higijenaService: HigijenaService;

    constructor(){
        this.higijenaService = new HigijenaService();
    }

    prikazHigijene(host: HTMLElement, naruci: NaruciService){
        let higijenaDiv  = document.createElement("div");
        higijenaDiv.className = "HigijenaDiv";

        const higijenaLbl = document.createElement("label");
        higijenaLbl.innerHTML = "Higijena: ";
        higijenaLbl.className = "HigijenaLbl";
        higijenaDiv.appendChild(higijenaLbl);


        this.nazivHigijene.forEach((naziv, index) => {
            const higijenaRadioBtn = document.createElement("input");
            higijenaRadioBtn.type = "radio";
            higijenaRadioBtn.name = "Higijena";
            higijenaRadioBtn.className = "HigijenaRadioBtn";
            higijenaRadioBtn.value = `${naziv}`;
            higijenaRadioBtn.id = `${index}`;
            higijenaDiv.appendChild(higijenaRadioBtn);


            const lbl = document.createElement("label");
            lbl.className = "lblHigijenaNaziv";
            higijenaDiv.appendChild(lbl);

        });

        const higijenaBtn = document.createElement("button");
        higijenaBtn.innerHTML = "Naruci higijenu";
        higijenaDiv.appendChild(higijenaBtn);

        host.appendChild(higijenaDiv);

        naruci.kreirajHigijenaObservable(higijenaBtn);
    }
}