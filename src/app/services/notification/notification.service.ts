import { Injectable } from '@angular/core';
import { SpaceRock } from '../../models/space-rock';

import { webSocket } from "rxjs/webSocket";
import { Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private subject: Subject<SpaceRock> = webSocket<SpaceRock>(environment.apiUrl + '/control');

  constructor() { 
    this.subject.pipe(retry()).subscribe(
      rock => console.log('message received: ' + rock), 
      err => console.log(err),
      () => console.log('complete')
    );
  }

  notify(rock : SpaceRock) {
    console.log("sending...")
    this.subject.next(rock);
  }

}
