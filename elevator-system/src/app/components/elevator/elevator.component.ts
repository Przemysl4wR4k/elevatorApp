import { Component, Input } from '@angular/core';
import { Elevator, Person, Status } from '../../models/elevator-system.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elevator[people][elevator]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.scss'
})
export class ElevatorComponent {
  @Input() elevator!: Elevator | null
  @Input() people!: Person[] | null
  
  status = Status
}
