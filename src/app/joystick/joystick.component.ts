import { Component, Output, EventEmitter } from '@angular/core';
import { PositionVector } from '../models/position-vector';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.css']
})
export class JoystickComponent {

  private _position: any;

  @Output() updated = new EventEmitter<PositionVector>();

  get position() {
    return this._position;
  }

  updatePosition($event: any): void {
    this._position = $event;
    this.updated.emit({x : this._position.deltaX, y: this._position.deltaY} as PositionVector);
  }

}
