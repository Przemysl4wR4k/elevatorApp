import { Component, Input } from '@angular/core';
import { Elevator, Person } from '../../models/elevator-system.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elevator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.scss'
})
export class ElevatorComponent {
  @Input() people!: Person[] | null
}
