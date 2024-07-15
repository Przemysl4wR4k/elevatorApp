import { Component } from '@angular/core';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-system-control-buttons',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './system-control-buttons.component.html',
  styleUrl: './system-control-buttons.component.scss'
})
export class SystemControlButtonsComponent {
  
  noOfFloors = new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1)
  ]);  
  noOfElevators = new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1)
  ]);

  constructor(protected elevatorSystemService: ElevatorSystemService) {
  }

  setNoOfFloors() {
    if (this.noOfFloors.valid && this.noOfFloors.value) {
      this.elevatorSystemService.setNoOfFloors(this.noOfFloors.value);
      this.noOfFloors.reset();
    }
  }
  setNoOfElevators() {
    if (this.noOfElevators.valid && this.noOfElevators.value) {
      this.elevatorSystemService.setNoOfElevators(this.noOfElevators.value);
      this.noOfElevators.reset();
    }
  }
}
