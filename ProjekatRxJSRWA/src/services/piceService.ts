import { debounceTime, from, fromEvent, map, Observable, switchMap } from "rxjs";
import { Pice } from "../models/pice";

const API_URL = "http://localhost:3000";

export class PiceService{
    getDrinkObservableById(id: number): Observable<Pice>{
        return from(
            fetch(API_URL+ "/pice/"+id)
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error("fetch error");
                }
            })
            .catch((er) => console.log(er))        
        );
    }

    getDrinkObservableByName(naziv: String) : Observable<Pice[]> {
        return from(
            fetch(API_URL + "/pice/?naziv=" + naziv)
            .then((response) =>{
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error("fetch error");
                }
            })
            .catch((er) => console.log(er))
        );
    }

    piceOnButtonClick(piceBtn: HTMLButtonElement){
        return fromEvent(piceBtn, "click").pipe(
            debounceTime(1000),
            map((ev: Event) =>(<HTMLButtonElement>ev.target).parentNode),
            map((div) => Array.from(div.querySelectorAll(".PiceRadioBtn"))),
            map((radios) => <HTMLInputElement[]>radios),
            map((radios) => radios.filter((radio) => radio.checked===true)),
            map((radios) => radios[0]),
            map((radio) => radio.value),
            switchMap((name) => this.getDrinkObservableByName(name)),
            map((pice) => pice[0])
        );
    }
    
}