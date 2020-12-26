import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { immediateClickDirective } from './immediate-click.directive';

@NgModule({
  declarations: [immediateClickDirective],
  exports: [immediateClickDirective],
  imports: [CommonModule]
})
export class ImmediateClickModule { }