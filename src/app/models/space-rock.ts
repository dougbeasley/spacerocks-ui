import { v4 as uuid } from 'uuid';

export class SpaceRock {
  readonly id: string = uuid();
  name: string;
  color: string;
  size: number;
  speed: number;
  deltaX: number;
  deltaY: number;

 constructor(name : string,
  color: string,
  size: number,
  speed: number,
  deltaX: number,
  deltaY: number) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.speed = speed;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }
}
