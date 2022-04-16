import { debounce, debounceTime, from, fromEvent, map, Observable, switchMap } from "rxjs";
import { Higijena } from "../models/higijena";

const API_URL = "http://localhost:3000";

export class HigijenaService{
    getHygieneObservableById(id : number) : Observable<Higijena>{
        return from(
            fetch(API_URL + "/higijena/"+id)
            .then((response)=>{
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

    getHygieneObservableByName(name: String): Observable<Higijena[]>{
        return from(
            fetch(API_URL + "/higijena/?naziv="+name)
            .then((response) =>{
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error("fetch error");
                }
            })
            .catch((er) =>console.log(er))
        );
    }
    higijenaOnButtonClick(higijenaBtn: HTMLButtonElement){
        return fromEvent(higijenaBtn, "click").pipe(
            debounceTime(1000),
            map((ev: Event) => (<HTMLButtonElement>ev.target).parentNode),
            map((div) => Array.from(div.querySelectorAll(".HigijenaRadioBtn"))),
            map((radios) => <HTMLInputElement[]>radios),
            map((radios) => radios.filter((radio)=> radio.checked === true)),
            map((radios) => radios[0]),
            map((radio) => radio.value),
            switchMap((name) => this.getHygieneObservableByName(name)),
            map((higijena) => higijena[0])
        );
    }
}