import { Injectable } from '@angular/core';
import { SpaceRock } from '../../models/space-rock';

import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = webSocket('ws://localhost:8080/connect');

  constructor() { 
    this.subject.subscribe(
      resp => console.log('message received: ' + resp['message']), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  notify(rock : SpaceRock) {
    this.subject.next(rock);
  }

}
