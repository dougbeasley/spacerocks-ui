import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpaceRock } from '../space-rock';
import { PositionVector } from '../position-vector';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  private spaceRock : SpaceRock = {
    name: 'Doug',
    color: '#fd59d7',
    size: 1,
    speed: 25,
    deltaX: 0.0,
    deltaY: 0.0
  };

  constructor() { }

  @Output() changed = new EventEmitter<SpaceRock>();

  ngOnInit() {
    this.notify();
  }

  private notify() : void {
    console.log(this.spaceRock);
    this.changed.emit(this.spaceRock);
  }

  private onNameUpdated(name: string): void {
    this.spaceRock.name = name;
    this.notify();
  }

  private onColorUpdated(color: string): void {
    this.spaceRock.color = color;
    this.notify();
  }

  private onSizeUpdated($event: MatSliderChange): void {
    this.spaceRock.size = $event.value;
    this.notify();
  }

  private onSpeedUpdated($event: MatSliderChange): void {
    this.spaceRock.speed = $event.value;
    this.notify();
  }

  private onPositionUpdated(position: PositionVector): void {
    this.spaceRock.deltaX = position.x;
    this.spaceRock.deltaY = position.y;
    this.notify();
  }
}