import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloorComponent } from '../floor/floor.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { ElevatorComponent } from '../elevator/elevator.component';

@Component({
  selector: 'app-elevator-system',
  standalone: true,
  imports: [CommonModule, ElevatorComponent, FloorComponent],
  templateUrl: './elevator-system.component.html',
  styleUrl: './elevator-system.component.scss'
})
export class ElevatorSystemComponent {

  constructor(protected elevatorSystemService: ElevatorSystemService) {
    
  }
}
