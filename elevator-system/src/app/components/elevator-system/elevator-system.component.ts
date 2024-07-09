import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloorComponent } from '../floor/floor.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';

@Component({
  selector: 'app-elevator-system',
  standalone: true,
  imports: [CommonModule, FloorComponent],
  templateUrl: './elevator-system.component.html',
  styleUrl: './elevator-system.component.scss'
})
export class ElevatorSystemComponent {

  constructor(protected elevatorSystemService: ElevatorSystemService) {
    
  }
}
