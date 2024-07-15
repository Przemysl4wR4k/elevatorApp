import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Elevator, Person, Status } from '../models/elevator-system.model';

@Injectable({
    providedIn: 'root',
})
export class ElevatorSystemService {
    floors$ = new BehaviorSubject<number[]>(Array.from({ length: 10 }, (_, k) => 9 - k));

    private elevatorsSubject = new BehaviorSubject<Elevator[]>(Array.from({ length: 4 }, (_, k) => ({
        id: k + 1,
        currentFloor: 0,
        floorsToStopOn: [],
        status: Status.wait
    })));
    elevators$ = this.elevatorsSubject.asObservable();

    private peopleSubject = new BehaviorSubject<Person[]>([]);
    people$ = this.peopleSubject.asObservable();

    setNoOfFloors(numFloors: number): void {
        this.floors$.next(Array.from({ length: numFloors }, (v, k) => numFloors - 1 - k));
    }

    setNoOfElevators(numElevators: number): void {
        const newElevators = Array.from({ length: numElevators }, (v, k) => ({
            id: k + 1,
            currentFloor: 0,
            floorsToStopOn: [],
            status: Status.wait
        }));
        this.elevatorsSubject.next(newElevators);
    }

    callElevator(startingFloor: number, destinationFloor: number): void {
        const currentPeople = this.peopleSubject.getValue();
        const currentElevators = this.elevatorsSubject.getValue();
        const callableElevators = currentElevators.filter(elevator => {
            if (startingFloor < destinationFloor) {
                return (elevator.status === Status.wait && !elevator.floorsToStopOn.length) ||
                    (elevator.status === Status.up && elevator.currentFloor <= startingFloor && elevator.floorsToStopOn.some(floor => floor >= startingFloor)) ||
                    (elevator.status === Status.wait && elevator.currentFloor <= startingFloor && elevator.floorsToStopOn.some(floor => floor >= startingFloor));
            } else {
                return (elevator.status === Status.wait && !elevator.floorsToStopOn.length) ||
                    (elevator.status === Status.down && elevator.currentFloor >= startingFloor && elevator.floorsToStopOn.some(floor => floor <= startingFloor)) ||
                    (elevator.status === Status.wait && elevator.currentFloor >= startingFloor && elevator.floorsToStopOn.some(floor => floor <= startingFloor));
            }
        });
    
        let bestElevator: Elevator | null = null;
        if (callableElevators && callableElevators.length) {
            const travelTimes = callableElevators.map(elevator => this.calculateTravelTime(elevator, startingFloor, destinationFloor));
            bestElevator = callableElevators[0];
            let bestTime = travelTimes[0];
    
            for (let i = 1; i < callableElevators.length; i++) {
                if (travelTimes[i] < bestTime) {
                    bestElevator = callableElevators[i];
                    bestTime = travelTimes[i];
                }
            }
    
            bestElevator.floorsToStopOn.push(+startingFloor);
            bestElevator.floorsToStopOn = [...new Set(bestElevator.floorsToStopOn)];
        }
    
        currentPeople.push({
            startingFloor,
            destinationFloor,
            elevatorNumber: 0,
            waitingForElevatorId: bestElevator ? bestElevator.id : 0
        });
    
        const updatedElevators = currentElevators.map(elevator =>
            bestElevator && elevator.id === bestElevator.id ? bestElevator : elevator
        );
    
        this.peopleSubject.next(currentPeople);
        this.elevatorsSubject.next(updatedElevators);
    }
    

    private calculateTravelTime(elevator: Elevator, startingFloor: number, destinationFloor: number): number {
        let travelTime = 0;
        const {status, floorsToStopOn} = elevator
        if(status === Status.wait || status === Status.transfer) travelTime +=1
        travelTime += Math.abs(startingFloor-elevator.currentFloor) + Math.abs(startingFloor - destinationFloor)
        const stopsDuringTravel = floorsToStopOn.filter(floor => startingFloor < destinationFloor ? floor <= destinationFloor : floor >= destinationFloor).length
        travelTime += stopsDuringTravel * 2

        return travelTime;
    }

    getWaitingPeople(floor: number): Observable<Person[]> {
        return this.people$.pipe(
            map(people => people.filter(person => person.startingFloor === floor && person.elevatorNumber === 0))
        );
    }

    getCarriedPeople(elevatorId: number): Observable<Person[]> {
        return this.people$.pipe(
            map(people => people.filter(person => person.elevatorNumber === elevatorId))
        );
    }

    nextStep(): void {
        const currentElevators = this.elevatorsSubject.getValue();
        let currentPeople = this.peopleSubject.getValue();
    
        currentElevators.forEach(elevator => {
            if (elevator.floorsToStopOn.length === 0) {
                elevator.status = Status.wait;
            } else {
                if (elevator.status === Status.wait || elevator.status === Status.transfer) {
                    if (elevator.floorsToStopOn.includes(elevator.currentFloor)) {
                        elevator.status = Status.transfer;
    
                        currentPeople = currentPeople.filter(person =>
                            !(person.elevatorNumber === elevator.id && person.destinationFloor === elevator.currentFloor)
                        );
                        currentPeople.forEach(person => {
                            if (person.waitingForElevatorId === elevator.id && person.startingFloor === elevator.currentFloor) {
                                person.elevatorNumber = elevator.id;
                                elevator.floorsToStopOn.push(person.destinationFloor);
                            }
                        });
    
                        elevator.floorsToStopOn = [...new Set(elevator.floorsToStopOn.filter(floor => floor !== elevator.currentFloor))];
                    } else {
                        elevator.status = elevator.floorsToStopOn[0] > elevator.currentFloor ? Status.up: Status.down;
                    }
                } else if (elevator.status === Status.up) {
                    elevator.currentFloor++;
                    if (elevator.floorsToStopOn.includes(elevator.currentFloor)) {
                        elevator.status = Status.transfer;
                    }
                } else if (elevator.status === Status.down) {
                    elevator.currentFloor--;
                    if (elevator.floorsToStopOn.includes(elevator.currentFloor)) {
                        elevator.status = Status.transfer;
                    }
                }
            }
        });
    
        this.peopleSubject.next(currentPeople);
        this.elevatorsSubject.next(currentElevators);
    
        const peopleToCall = currentPeople.filter(person => person.waitingForElevatorId === 0);
        currentPeople = currentPeople.filter(person => person.waitingForElevatorId !== 0);
    
        this.peopleSubject.next(currentPeople);
    
        peopleToCall.forEach(person => this.callElevator(person.startingFloor, person.destinationFloor));
    }
    
    
    
}
