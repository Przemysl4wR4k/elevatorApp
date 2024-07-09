import { Component, Input } from '@angular/core';
import { Person } from '../../models/elevator-system.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elevator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.scss'
})
export class ElevatorComponent {
  @Input() id!: number
  @Input() people!: Person[] | null
}
