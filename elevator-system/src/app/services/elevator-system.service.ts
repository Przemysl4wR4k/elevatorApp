import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Elevator, Person } from '../models/elevator-system.model';


@Injectable({
    providedIn: 'root',
})
export class ElevatorSystemService {
    floors$ = new BehaviorSubject<number[]>(Array.from({ length: 10 }, (v, k) => 9 - k));
    
    private elevatorsSubject = new BehaviorSubject<Elevator[]>(Array.from({ length: 4 }, (v, k) => ({
        id: k + 1,
        currentFloor: 0,
        floorsToStopOn: [],
        status: 'wait' as 'wait'
    })));
    elevators$ = this.elevatorsSubject.asObservable();

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

        this.resolveElevatorToCall()
    }

    private resolveElevatorToCall() {

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

    nextStep(): void {
        const currentElevators = this.elevatorsSubject.getValue();

        currentElevators.forEach(elevator => {
            if(elevator.floorsToStopOn.length === 0) {
                elevator.status = 'wait'
            }
            else if (elevator.status === 'wait' || elevator.status === 'transfer') {
                if (elevator.floorsToStopOn.some(floor => floor === elevator.currentFloor)) {
                    elevator.status = 'transfer';
                }
                else if(elevator.floorsToStopOn.some(floor => floor > elevator.currentFloor)) {
                     elevator.status = 'up';
                }
                else if ( elevator.floorsToStopOn.some(floor => floor < elevator.currentFloor)) {
                    elevator.status = 'down';
                } else {
                    elevator.status === 'wait'
                }
            }
            else if(elevator.status === 'down') {
                if(elevator.floorsToStopOn.includes(elevator.currentFloor)) {
                    elevator.status = 'transfer'
                } else {
                    elevator.currentFloor -=1
                }
            }
            else if(elevator.status === 'up') {
                if(elevator.floorsToStopOn.includes(elevator.currentFloor)) {
                    elevator.status = 'transfer'
                } else {
                    elevator.currentFloor +=1
                }
            }
        });

        this.elevatorsSubject.next(currentElevators);
    }
}
