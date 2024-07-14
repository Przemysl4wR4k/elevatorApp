import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElevatorSystemComponent } from './elevator-system.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('ElevatorSystemComponent', () => {
  let component: ElevatorSystemComponent;
  let fixture: ComponentFixture<ElevatorSystemComponent>;
  let elevatorSystemService: jasmine.SpyObj<ElevatorSystemService>;

  beforeEach(async () => {
    const elevatorSystemServiceSpy = jasmine.createSpyObj('ElevatorSystemService', ['floors$', 'elevators$', 'getWaitingPeople', 'getCarriedPeople']);
    
    elevatorSystemServiceSpy.floors$ = of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    elevatorSystemServiceSpy.elevators$ = of([
      { id: 1, currentFloor: 0, floorsToStopOn: [], status: 'wait' },
      { id: 2, currentFloor: 0, floorsToStopOn: [], status: 'wait' },
      { id: 3, currentFloor: 0, floorsToStopOn: [], status: 'wait' },
      { id: 4, currentFloor: 0, floorsToStopOn: [], status: 'wait' }
    ]);
    elevatorSystemServiceSpy.getWaitingPeople.and.returnValue(of([]));
    elevatorSystemServiceSpy.getCarriedPeople.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CommonModule, ElevatorSystemComponent],
      providers: [
        { provide: ElevatorSystemService, useValue: elevatorSystemServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ElevatorSystemComponent);
    component = fixture.componentInstance;
    elevatorSystemService = TestBed.inject(ElevatorSystemService) as jasmine.SpyObj<ElevatorSystemService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render floors and elevators', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr');

    expect(rows.length).toBe(10);

    rows.forEach(row => {
      const cells = row.querySelectorAll('td.elevator');
      expect(cells.length).toBe(4);
    });
  });

  it('should render floor controls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const floorControls = compiled.querySelectorAll('app-floor');

    expect(floorControls.length).toBe(10);
  });

  it('should render system control buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const systemControlButtons = compiled.querySelector('app-system-control-buttons');

    expect(systemControlButtons).toBeTruthy();
  });
});
