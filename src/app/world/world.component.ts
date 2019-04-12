import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import * as THREE from 'three';
import { SpaceRock } from '../models/space-rock';
import { MeshNormalMaterial } from 'three';
import { animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

import { environment } from '../../environments/environment';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  private subject: Subject<SpaceRock> = webSocket<SpaceRock>(environment.apiUrl + '/listen');

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;

  rocks = new Map<string, SpaceRock>();

  constructor() { 
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(100, 0, 250);
    this.scene.add(light);

    this.subject.pipe(retry())
    .subscribe(
      rock => this.updateRock(rock),
      err => console.error(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  ngAfterViewInit() {
    const h = this.rendererContainer.nativeElement.offsetHeight;
    const w = this.rendererContainer.nativeElement.offsetWidth;

    this.renderer.setSize(w, h);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    const h = this.rendererContainer.nativeElement.offsetHeight;
    const w = this.rendererContainer.nativeElement.offsetWidth;
    //this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
    this.renderer.setSize(w, h);
  }

  private updateRock(rock : SpaceRock) {
    this.rocks.set(rock.id, rock);

    if(!this.scene.getObjectByName(rock.id)) {
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshLambertMaterial({color: 0xfd59d7});
      let mesh = new THREE.Mesh(geometry, material);
      /* TODO might be better to use a user data field instead of a name */

      mesh.name = rock.id;
      this.scene.add(mesh);
    }
  }

  private removeRock(id : string) {
    
    this.rocks.delete(id);
    
    let obj = this.scene.getObjectByName(id);
    this.scene.remove(obj);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    let frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));

    /* animate rocks */
    for (let [key, rock] of this.rocks.entries()) {
      let mesh = this.scene.getObjectByName(key);

      mesh.userData.rockName = rock.name;

      mesh.scale.x = rock.size;
      mesh.scale.y = rock.size;
      mesh.scale.z = rock.size;

      mesh.material.color =  new THREE.Color(rock.color);

      /* simple rotation*/
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      let speedFactor = (51 - rock.speed);

      /* calculate the position */
      let x = mesh.position.x + (rock.deltaX / speedFactor);
      let y = mesh.position.y + (rock.deltaY / speedFactor);
      let pos = new THREE.Vector3(x, y, mesh.position.z);

      if (frustum.containsPoint(pos)) {
        mesh.position.x += (rock.deltaX / speedFactor);
        mesh.position.y += (rock.deltaY / speedFactor);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}
