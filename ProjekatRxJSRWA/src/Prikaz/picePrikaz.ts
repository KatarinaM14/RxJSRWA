import { NaruciService } from "../services/naruciService";
import { PiceService } from "../services/piceService";

export class PicePrikaz{
    nazivPica = ["Coca cola", "Knjaz Milos","Fanta","Nektar"];
    piceService: PiceService;

    constructor(){
        this.piceService = new PiceService();
    }

    prikazPica(host: HTMLElement, naruci: NaruciService){
        let piceDiv = document.createElement("div");
        piceDiv.className = "PiceDiv";
        const piceLbl = document.createElement("label");
        piceLbl.innerHTML = "Pice: ";
        piceLbl.className = "PiceLbl";
        piceDiv.appendChild(piceLbl);

        
        this.nazivPica.forEach((naziv, index) =>{
            let proizvod = document.createElement("div");
            let divRBtnName = document.createElement("div");
            const piceRadioBtn = document.createElement("input");
            piceRadioBtn.type = "radio";
            piceRadioBtn.name = "Pice";
            piceRadioBtn.className = "PiceRadioBtn";
            piceRadioBtn.value = `${naziv}`;
            piceRadioBtn.id = `${index}`;
            divRBtnName.appendChild(piceRadioBtn);

            const lbl = document.createElement("label");
            lbl.className = "lblPice";
            lbl.innerHTML = `${naziv}`;
            divRBtnName.appendChild(lbl);


            proizvod.appendChild(divRBtnName);

            if(index == 0)
            {
                let slikaCocaCole = document.createElement("div");
                slikaCocaCole.className = "SlikaCocaCole";
                proizvod.appendChild(slikaCocaCole);
            }
            else if(index==1)
            {
                let slikaVode= document.createElement("div");
                slikaVode.className = "SlikaVode";
                proizvod.appendChild(slikaVode);
            }
            else if(index==2)
            {
                let slikaFante = document.createElement("div");
                slikaFante.className = "SlikaFante";
                proizvod.appendChild(slikaFante);
            }
            else if(index==3)
            {
                let slikaNektara = document.createElement("div");
                slikaNektara.className = "SlikaNektara";
                proizvod.appendChild(slikaNektara);
            }

            piceDiv.appendChild(proizvod);
        });

        const piceBtn = document.createElement("button");
        piceBtn.innerHTML = "Dodaj u korpu";
        piceBtn.className = "Button";
        piceDiv.appendChild(piceBtn);

        host.appendChild(piceDiv);

        naruci.kreirajPiceObservable(piceBtn);
    }
}