import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloorComponent } from '../floor/floor.component';

@Component({
  selector: 'app-elevator-system',
  standalone: true,
  imports: [CommonModule, FloorComponent],
  templateUrl: './elevator-system.component.html',
  styleUrl: './elevator-system.component.scss'
})
export class ElevatorSystemComponent {
  protected floors = Array.from({length:10},(v,k)=>k+1);
  protected elevators = Array.from({length:4},(v,k)=>k+1)
}
