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
            let divRBtnName = document.createElement("div");
            const higijenaRadioBtn = document.createElement("input");
            higijenaRadioBtn.type = "radio";
            higijenaRadioBtn.name = "Higijena";
            higijenaRadioBtn.className = "HigijenaRadioBtn";
            higijenaRadioBtn.value = `${naziv}`;
            higijenaRadioBtn.id = `${index}`;
            divRBtnName.appendChild(higijenaRadioBtn);


            const lbl = document.createElement("label");
            lbl.className = "lblHigijenaNaziv";
            lbl.innerHTML = `${naziv}`;
            divRBtnName.appendChild(lbl);

            higijenaDiv.appendChild(divRBtnName);

        });

        const higijenaBtn = document.createElement("button");
        higijenaBtn.innerHTML = "Dodaj u korpu";
        higijenaBtn.className = "Button";
        higijenaDiv.appendChild(higijenaBtn);

        host.appendChild(higijenaDiv);

        naruci.kreirajHigijenaObservable(higijenaBtn);
    }
}