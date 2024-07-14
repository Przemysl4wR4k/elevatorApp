import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloorComponent } from './floor.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../models/elevator-system.model';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FloorComponent', () => {
  let component: FloorComponent;
  let fixture: ComponentFixture<FloorComponent>;
  let elevatorSystemService: jasmine.SpyObj<ElevatorSystemService>;

  beforeEach(async () => {
    const elevatorSystemServiceSpy = jasmine.createSpyObj('ElevatorSystemService', ['callElevator']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FloorComponent],
      providers: [
        { provide: ElevatorSystemService, useValue: elevatorSystemServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FloorComponent);
    component = fixture.componentInstance;
    elevatorSystemService = TestBed.inject(ElevatorSystemService) as jasmine.SpyObj<ElevatorSystemService>;

    // Set input properties
    component.id = 1;
    component.people = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input and button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input');
    const button = compiled.querySelector('button');

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should call elevator when form is valid', () => {
    component.destinationFloorControl.setValue(2);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();

    expect(elevatorSystemService.callElevator).toHaveBeenCalledWith(component.id, 2);
    expect(component.destinationFloorControl.value).toBeNull();
  });

  it('should not call elevator when form is invalid', () => {
    component.destinationFloorControl.setValue(null);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();

    expect(elevatorSystemService.callElevator).not.toHaveBeenCalled();
  });

  it('should display people on the floor', () => {
    const people: Person[] = [
      { startingFloor: 1, destinationFloor: 3, elevatorNumber: 0, waitingForElevatorId: 0 },
      { startingFloor: 1, destinationFloor: 5, elevatorNumber: 0, waitingForElevatorId: 0 }
    ];
    component.people = people;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const peopleListItems = compiled.querySelectorAll('.person');

    expect(peopleListItems.length).toBe(2);
  });
});
