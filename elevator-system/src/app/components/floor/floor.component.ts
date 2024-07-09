import { Component, Input } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { Person } from '../../models/elevator-system.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {
  @Input() id!: number;
  @Input() people!: Person[] | null;

  destinationFloorControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1)
  ]);

  constructor(protected elevatorSystemService: ElevatorSystemService) {}

  callElevator() {
    if (this.destinationFloorControl.valid) {
      const destinationFloor = this.destinationFloorControl.value;
      //@ts-ignore
      this.elevatorSystemService.callElevator(this.id, destinationFloor);
      this.destinationFloorControl.reset();
    }
  }
}
