import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { NgxVirtualJoystickModule } from 'ngx-virtual-joystick';
import { JoystickComponent } from './joystick/joystick.component';

import { AppMaterialModule } from './app-material/app-material.module';
import { ControlComponent } from './control/control.component';
import { WorldComponent } from './world/world.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    JoystickComponent,
    ControlComponent,
    WorldComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxVirtualJoystickModule,
    FlexLayoutModule,
    ColorPickerModule,
    AppMaterialModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
