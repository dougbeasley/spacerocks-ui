import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule, MatListModule, MatMenuModule, MatIconModule, MatExpansionModule],
  exports: [MatSliderModule, MatInputModule, MatCardModule, MatToolbarModule, MatListModule, MatMenuModule, MatIconModule, MatExpansionModule]
})
export class AppMaterialModule { }
