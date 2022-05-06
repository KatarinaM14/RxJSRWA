import { debounceTime, filter, from, fromEvent, map, Observable, switchMap } from "rxjs";
import { Lokacija } from "../models/lokacija";
import { API_URL } from "../constants";

//const API_URL = "http://localhost:3000";

export class LokacijaService{
    getLocationObservableById(id: number): Observable<Lokacija>{
        return from(
            fetch(API_URL + "/lokacija/"+id)
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

    getLocationObservableByLocation(lokacija: String) : Observable<Lokacija[]>{
        return from(
            fetch(API_URL + "/lokacija/?lokacija="+ lokacija)
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

    lokacijaInput(inputLokacija: HTMLInputElement){
        return fromEvent(inputLokacija, "input")
        .pipe( 
            debounceTime(500),
            map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
            filter((lokacija) => lokacija.length >= 3),
            switchMap((lokacija) => this.getLocationObservableByLocation(lokacija)),
            map((lokacija: Lokacija[]) => lokacija[0])
        )
    }
}