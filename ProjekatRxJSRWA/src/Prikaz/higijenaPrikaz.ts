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
            let proizvod = document.createElement("div");
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

            proizvod.appendChild(divRBtnName);

            if(index == 0)
            {
                let slikaColgate = document.createElement("div");
                slikaColgate.className = "SlikaColgate";
                proizvod.appendChild(slikaColgate);
            }
            else if(index==1)
            {
                let slikaRexona= document.createElement("div");
                slikaRexona.className = "SlikaRexona";
                proizvod.appendChild(slikaRexona);
            }
            else if(index==2)
            {
                let slikaNivea = document.createElement("div");
                slikaNivea.className = "SlikaNivea";
                proizvod.appendChild(slikaNivea);
            }
            else if(index==3)
            {
                let slikaDove = document.createElement("div");
                slikaDove.className = "SlikaDove";
                proizvod.appendChild(slikaDove);
            }

            higijenaDiv.appendChild(proizvod);

        });

        const higijenaBtn = document.createElement("button");
        higijenaBtn.innerHTML = "Dodaj u korpu";
        higijenaBtn.className = "Button";
        higijenaDiv.appendChild(higijenaBtn);

        host.appendChild(higijenaDiv);

        naruci.kreirajHigijenaObservable(higijenaBtn);
    }
}