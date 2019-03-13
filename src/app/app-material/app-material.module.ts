import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatInputModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    MatSliderModule, MatInputModule, MatCardModule],
  exports: [MatSliderModule, MatInputModule, MatCardModule]
})
export class AppMaterialModule { }
