import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'world', component: WorldComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
