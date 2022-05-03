import { HranaService } from "../services/hranaService";
import { NaruciService } from "../services/naruciService";



export class HranaPrikaz{
    nazivHrana = ["Jabuke", "Plazma", "Balans", "Zlatiborac"];
    hranaService: HranaService;

    constructor(){
        this.hranaService = new HranaService();
    }


    prikazHrane(host: HTMLElement, naruci: NaruciService) {
        let hranaDiv = document.createElement("div");
        hranaDiv.className = "HranaDiv";

        const hranaLbl = document.createElement("label");
        hranaLbl.innerHTML = "Hrana: ";
        hranaLbl.className = "HranaLbl";
        hranaDiv.appendChild(hranaLbl);
    
        this.nazivHrana.forEach((naziv, index) => {
            let proizvod = document.createElement("div");
            let divRBtnName = document.createElement("div");
            const hranaRadioBtn = document.createElement("input");
            hranaRadioBtn.type= "radio";
            hranaRadioBtn.name = "Hrana";
            hranaRadioBtn.className = "HranaRadioBtn";
            hranaRadioBtn.value = `${naziv}`;
            hranaRadioBtn.id = `${index}`;
            divRBtnName.appendChild(hranaRadioBtn);

            const lbl = document.createElement("label");
            lbl.className = "lblHranaNaziv";
            lbl.innerHTML = `${naziv}`;
            divRBtnName.appendChild(lbl);


            proizvod.appendChild(divRBtnName);

            if(index == 0)
            {
                let slikaJabuke = document.createElement("div");
                slikaJabuke.className = "SlikaJabuke";
                proizvod.appendChild(slikaJabuke);
            }
            else if(index==1)
            {
                let slikaPlazme = document.createElement("div");
                slikaPlazme.className = "SlikaPlazme";
                proizvod.appendChild(slikaPlazme);
            }
            else if(index==2)
            {
                let slikaBalansa = document.createElement("div");
                slikaBalansa.className = "SlikaBalansa";
                proizvod.appendChild(slikaBalansa);
            }
            else if(index==3)
            {
                let slikaZlatiborca = document.createElement("div");
                slikaZlatiborca.className = "SlikaZlatiborca";
                proizvod.appendChild(slikaZlatiborca);
            }

            hranaDiv.appendChild(proizvod);
        });

        const hranaBtn = document.createElement("button");
        hranaBtn.className = "Button";
        hranaBtn.innerHTML = "Dodaj u korpu";
        hranaDiv.appendChild(hranaBtn);

        host.appendChild(hranaDiv);


        naruci.kreirajHranaObservable(hranaBtn);

    }
}


