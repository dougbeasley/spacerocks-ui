import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule],
  exports: [MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule]
})
export class AppMaterialModule { }
