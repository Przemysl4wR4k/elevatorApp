import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloorComponent } from '../floor/floor.component';
import { ElevatorSystemService } from '../../services/elevator-system.service';
import { ElevatorComponent } from '../elevator/elevator.component';
import { SystemControlButtonsComponent } from '../system-control-buttons/system-control-buttons.component';
import { Status } from '../../models/elevator-system.model';

@Component({
  selector: 'app-elevator-system',
  standalone: true,
  imports: [CommonModule, ElevatorComponent, FloorComponent, SystemControlButtonsComponent],
  templateUrl: './elevator-system.component.html',
  styleUrl: './elevator-system.component.scss'
})
export class ElevatorSystemComponent {

  status = Status
  constructor(protected elevatorSystemService: ElevatorSystemService) {
  }
}
