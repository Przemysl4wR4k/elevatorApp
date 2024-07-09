import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Person } from '../models/elevator-system.model';

@Injectable({
    providedIn: 'root',
})
export class ElevatorSystemService {
    floors$ = new BehaviorSubject<number[]>(Array.from({ length: 10 }, (v, k) => 10 - k));
    elevators$ = new BehaviorSubject<number[]>(Array.from({ length: 4 }, (v, k) => k + 1));

    private peopleSubject = new BehaviorSubject<Person[]>([]);
    people$ = this.peopleSubject.asObservable();

    callElevator(startingFloor: number, destinationFloor: number): void {
        const currentPeople = this.peopleSubject.getValue();
        currentPeople.push({
            startingFloor,
            destinationFloor,
            elevatorNumber: 0
        });
        this.peopleSubject.next(currentPeople);
    }

    getWaitingPeople(floor: number): Observable<Person[]> {
        return this.people$.pipe(
            map(people => people.filter(person => person.startingFloor === floor && person.elevatorNumber === 0))
        );
    }

    getCarriedPeople(floor: number, elevatorId: number): Observable<Person[]> {
        return this.people$.pipe(
            map(people => people.filter(person => person.startingFloor === floor && person.elevatorNumber === elevatorId))
        );
    }
}
