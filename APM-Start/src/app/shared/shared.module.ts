import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { ConvertToSpacePipe } from '../products/product-list.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StarComponent, ConvertToSpacePipe],
  imports: [CommonModule],
  exports: [FormsModule, CommonModule, StarComponent, ConvertToSpacePipe],
})
export class SharedModule {}
