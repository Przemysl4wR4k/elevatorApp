export interface Person {
    startingFloor: number,
    destinationFloor: number,
    elevatorNumber: number
    waitingForElevatorId: number
}

export interface Elevator {
    id: number;
    currentFloor: number;
    floorsToStopOn: number[];
    status: Status
}
export enum Status {
    up,
    down,
    transfer,
    wait
}