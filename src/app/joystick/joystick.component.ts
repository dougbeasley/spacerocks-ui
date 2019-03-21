import { Component, Output, EventEmitter } from '@angular/core';
import { PositionVector } from '../models/position-vector';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.css']
})
export class JoystickComponent {

  private position: any;

  @Output() updated = new EventEmitter<PositionVector>();

  private updatePosition($event: any): void {
    this.position = $event;
    this.updated.emit({x : this.position.deltaX, y: this.position.deltaY} as PositionVector);
  }

}
