import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpaceRock } from '../models/space-rock';
import { PositionVector } from '../models/position-vector';
import { MatSliderChange } from '@angular/material';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  private spaceRock : SpaceRock = new SpaceRock('Doug','#fd59d7',1,25,0.0,0.0);

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