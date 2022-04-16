import { debounce, debounceTime, from, fromEvent, map, Observable, switchMap } from "rxjs";
import { Hrana } from "../models/hrana";


const API_URL = "http://localhost:3000";

export class HranaService {
    getFoodObservableById(id: number) : Observable<Hrana>{
        return from(
            fetch(API_URL + "/hrana/"+ id)
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

    getFoodObservableByName(naziv: String): Observable<Hrana[]>{
        return from(
            fetch(API_URL+ "/hrana/?naziv="+naziv)
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

    hranaOnButtonClick(hranaBtn: HTMLButtonElement){
        return fromEvent(hranaBtn, "click").pipe(
            debounceTime(1000),
            map((ev: Event) =>(<HTMLButtonElement>ev.target).parentNode),
            map((div) => Array.from(div.querySelectorAll(".HranaRadioBtn"))),
            map((radios) => <HTMLInputElement[]>radios),
            map((radios) => radios.filter((radio) => radio.checked === true)),
            map((radios) => radios[0]),
            map((radio) => radio.value),
            switchMap((name) => this.getFoodObservableByName(name)),
            map((hrana) => hrana[0])
        );
    }
}