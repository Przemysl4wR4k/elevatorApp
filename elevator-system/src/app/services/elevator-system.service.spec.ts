import { TestBed } from '@angular/core/testing';
import { ElevatorSystemService } from './elevator-system.service';

describe('ElevatorSystemService', () => {
  let service: ElevatorSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevatorSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    service.elevators$.subscribe(elevators => {
      expect(elevators.length).toBe(4);
      expect(elevators.every(elevator => elevator.currentFloor === 0)).toBeTruthy();
    });

    service.floors$.subscribe(floors => {
      expect(floors.length).toBe(10);
      expect(floors[0]).toBe(9);
    });

    service.people$.subscribe(people => {
      expect(people.length).toBe(0);
    });
  });

  it('should set number of floors correctly', () => {
    service.setNoOfFloors(5);
    service.floors$.subscribe(floors => {
      expect(floors.length).toBe(5);
      expect(floors[0]).toBe(4);
    });
  });

  it('should set number of elevators correctly', () => {
    service.setNoOfElevators(3);
    service.elevators$.subscribe(elevators => {
      expect(elevators.length).toBe(3);
    });
  });

  describe('callElevator', () => {
    it('should assign the best elevator', () => {
      service.setNoOfFloors(10);
      service.setNoOfElevators(3);

      service.callElevator(3, 7);

      service.elevators$.subscribe(elevators => {
        const assignedElevator = elevators.find(elevator => elevator.floorsToStopOn.includes(3));
        expect(assignedElevator).toBeTruthy();
      });

      service.people$.subscribe(people => {
        const person = people.find(person => person.startingFloor === 3 && person.destinationFloor === 7);
        expect(person).toBeTruthy();
        if (person) {
          expect(person.waitingForElevatorId).not.toBe(0);
        }
      });
    });

    it('should handle no available elevators correctly', () => {
      service.setNoOfFloors(10);
      service.setNoOfElevators(0);

      service.callElevator(3, 7);

      service.elevators$.subscribe(elevators => {
        expect(elevators.length).toBe(0);
      });

      service.people$.subscribe(people => {
        const person = people.find(person => person.startingFloor === 3 && person.destinationFloor === 7);
        expect(person).toBeTruthy();
        if (person) {
          expect(person.waitingForElevatorId).toBe(0);
        }
      });
    });
  });

  describe('nextStep', () => {
    it('should move elevators correctly', () => {
      service.setNoOfFloors(10);
      service.setNoOfElevators(1);

      service.callElevator(3, 7);

      service.nextStep();
      service.nextStep();

      service.elevators$.subscribe(elevators => {
        const elevator = elevators[0];
        expect(elevator.currentFloor).toBe(1);
      });
    });

    it('should handle transfers correctly', () => {
      service.setNoOfFloors(10);
      service.setNoOfElevators(1);

      service.callElevator(3, 7);

      for (let i = 0; i < 4; i++) {
        service.nextStep();
      }

      service.elevators$.subscribe(elevators => {
        const elevator = elevators[0];
        expect(elevator.currentFloor).toBe(3);
        expect(elevator.status).toBe('transfer');
      });
    });

    it('should call elevator for waiting people with waitingForElevatorId === 0', () => {
      service.setNoOfFloors(10);
      service.setNoOfElevators(1);

      service.callElevator(3, 7);

      service.nextStep();

      service.people$.subscribe(people => {
        const waitingPeople = people.filter(person => person.waitingForElevatorId === 0);
        expect(waitingPeople.length).toBe(0);
      });
    });
  });
});
