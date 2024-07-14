import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElevatorComponent } from './elevator.component';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/elevator-system.model';

describe('ElevatorComponent', () => {
  let component: ElevatorComponent;
  let fixture: ComponentFixture<ElevatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ElevatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ElevatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render people in the elevator', () => {
    const people: Person[] = [
      { startingFloor: 1, destinationFloor: 3, elevatorNumber: 1, waitingForElevatorId: 0 },
      { startingFloor: 2, destinationFloor: 5, elevatorNumber: 1, waitingForElevatorId: 0 }
    ];
    component.people = people;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const personElements = compiled.querySelectorAll('.person');

    expect(personElements.length).toBe(2);
    expect(personElements[0].textContent).toContain('1 → 3');
    expect(personElements[1].textContent).toContain('2 → 5');
  });

  it('should render no people when input is null', () => {
    component.people = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const personElements = compiled.querySelectorAll('.person');

    expect(personElements.length).toBe(0);
  });

  it('should render no people when input is empty', () => {
    component.people = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const personElements = compiled.querySelectorAll('.person');

    expect(personElements.length).toBe(0);
  });
});
