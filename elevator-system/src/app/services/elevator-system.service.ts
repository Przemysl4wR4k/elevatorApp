import { Injectable } from "@angular/core";
import { ElevatorSystem } from "../models/elevator-system.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ElevatorSystemService {
    floors$ = new BehaviorSubject<number[]>(Array.from({length:10},(v,k)=>k+1))
    elevators$ = new BehaviorSubject<number[]>(Array.from({length:4},(v,k)=>k+1))
}