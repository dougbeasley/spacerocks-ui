import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule, MatListModule, MatMenuModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [CommonModule,
    MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule, MatListModule, MatMenuModule, MatIconModule],
  exports: [MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule, MatListModule, MatMenuModule, MatIconModule]
})
export class AppMaterialModule { }
