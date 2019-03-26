import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpaceRock } from '../models/space-rock';
import { PositionVector } from '../models/position-vector';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  private _spaceRock : SpaceRock = new SpaceRock('Doug','#fd59d7',1,25,0.0,0.0);

  constructor() { }

  @Output() changed = new EventEmitter<SpaceRock>();

  ngOnInit() {
    this.notify();
  }

  get spaceRock() {
    return this._spaceRock;
  }

  private notify() : void {
    console.log(this._spaceRock);
    this.changed.emit(this._spaceRock);
  }

  onNameUpdated(name: string): void {
    this._spaceRock.name = name;
    this.notify();
  }

  onColorUpdated(color: string): void {
    this._spaceRock.color = color;
    this.notify();
  }

  onSizeUpdated($event: MatSliderChange): void {
    this._spaceRock.size = $event.value;
    this.notify();
  }

  onSpeedUpdated($event: MatSliderChange): void {
    this._spaceRock.speed = $event.value;
    this.notify();
  }

  onPositionUpdated(position: PositionVector): void {
    this._spaceRock.deltaX = position.x;
    this._spaceRock.deltaY = position.y;
    this.notify();
  }
}
