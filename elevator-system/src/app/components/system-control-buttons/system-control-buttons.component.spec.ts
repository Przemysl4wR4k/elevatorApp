import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemControlButtonsComponent } from './system-control-buttons.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SystemControlButtonsComponent', () => {
  let component: SystemControlButtonsComponent;
  let fixture: ComponentFixture<SystemControlButtonsComponent>;
  let elevatorSystemService: jasmine.SpyObj<ElevatorSystemService>;

  beforeEach(async () => {
    const elevatorSystemServiceSpy = jasmine.createSpyObj('ElevatorSystemService', ['setNoOfFloors', 'setNoOfElevators', 'nextStep']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SystemControlButtonsComponent],
      providers: [
        { provide: ElevatorSystemService, useValue: elevatorSystemServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SystemControlButtonsComponent);
    component = fixture.componentInstance;
    elevatorSystemService = TestBed.inject(ElevatorSystemService) as jasmine.SpyObj<ElevatorSystemService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set number of floors', () => {
    component.noOfFloors.setValue(5);
    component.setNoOfFloors();

    expect(elevatorSystemService.setNoOfFloors).toHaveBeenCalledWith(5);
    expect(component.noOfFloors.value).toBeNull();
  });

  it('should not set number of floors if invalid', () => {
    component.noOfFloors.setValue(null);
    component.setNoOfFloors();

    expect(elevatorSystemService.setNoOfFloors).not.toHaveBeenCalled();
  });

  it('should set number of elevators', () => {
    component.noOfElevators.setValue(3);
    component.setNoOfElevators();

    expect(elevatorSystemService.setNoOfElevators).toHaveBeenCalledWith(3);
    expect(component.noOfElevators.value).toBeNull();
  });

  it('should not set number of elevators if invalid', () => {
    component.noOfElevators.setValue(null);
    component.setNoOfElevators();

    expect(elevatorSystemService.setNoOfElevators).not.toHaveBeenCalled();
  });

  it('should render input fields and buttons', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const floorInput = compiled.querySelector('input[id="no-of-floors"]');
    const elevatorInput = compiled.querySelector('input[id="no-of-elevators"]');
    const setFloorsButton = compiled.querySelector('button:nth-of-type(1)');
    const setElevatorsButton = compiled.querySelector('button:nth-of-type(2)');
    const nextStepButton = compiled.querySelector('button:nth-of-type(3)');

    expect(floorInput).toBeTruthy();
    expect(elevatorInput).toBeTruthy();
    expect(setFloorsButton).toBeTruthy();
    expect(setElevatorsButton).toBeTruthy();
    expect(nextStepButton).toBeTruthy();
  });

  it('should disable buttons if form controls are invalid', () => {
    component.noOfFloors.setValue(null);
    component.noOfElevators.setValue(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const setFloorsButton = compiled.querySelector('button:nth-of-type(1)') as HTMLButtonElement;
    const setElevatorsButton = compiled.querySelector('button:nth-of-type(2)') as HTMLButtonElement;

    expect(setFloorsButton.disabled).toBeTruthy();
    expect(setElevatorsButton.disabled).toBeTruthy();
  });

  it('should enable buttons if form controls are valid', () => {
    component.noOfFloors.setValue(5);
    component.noOfElevators.setValue(3);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const setFloorsButton = compiled.querySelector('button:nth-of-type(1)') as HTMLButtonElement;
    const setElevatorsButton = compiled.querySelector('button:nth-of-type(2)') as HTMLButtonElement;

    expect(setFloorsButton.disabled).toBeFalsy();
    expect(setElevatorsButton.disabled).toBeFalsy();
  });
});
