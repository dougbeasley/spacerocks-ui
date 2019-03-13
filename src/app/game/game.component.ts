import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import * as THREE from 'three';
import { SpaceRock } from '../space-rock';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  private translateX : number = 0;
  private translateY : number = 0;
  private speedFactor : number = 1;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({color: 0xfd59d7});
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(100, 0, 250);
    this.scene.add(light);
  }

  ngAfterViewInit() {
    const h = this.rendererContainer.nativeElement.offsetHeight;
    const w = this.rendererContainer.nativeElement.offsetWidth;
    //this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(w, h);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    var frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));  
    
    let x = this.mesh.position.x + (this.translateX / this.speedFactor);
    let y = this.mesh.position.y + (this.translateY / this.speedFactor);

    var pos = new THREE.Vector3(x, y, 0);
    if (frustum.containsPoint(pos)) {
      this.mesh.position.x += (this.translateX / this.speedFactor);
      this.mesh.position.y += (this.translateY / this.speedFactor);
    }


    this.renderer.render(this.scene, this.camera);

    console.log(this.mesh.position);
    console.log(`h: ${this.rendererContainer.nativeElement.offsetHeight}`, `w: ${this.rendererContainer.nativeElement.offsetWidth}`,);
  }

  onChange(rock: SpaceRock) {
    this.mesh.name = rock.name;
    
    this.mesh.scale.x = rock.size;
    this.mesh.scale.y = rock.size;
    this.mesh.scale.z = rock.size;

    this.mesh.material.color =  new THREE.Color(rock.color);

    this.translateX = rock.deltaX;
    this.translateY = rock.deltaY;

    console.log(`x: ${this.mesh.rotation.x}, y: ${this.mesh.rotation.y}`);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    const h = this.rendererContainer.nativeElement.offsetHeight;
    const w = this.rendererContainer.nativeElement.offsetWidth;
    //this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
    this.renderer.setSize(w, h);
  }
}
