import { NgModule } from '@angular/core';
import { CgpaToPercentagePipe } from './pipes/cgpa-to-percentage.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CgpaToPercentagePipe],
  imports: [MatSnackBarModule],
  exports: [CgpaToPercentagePipe, MatSnackBarModule],
})
export class SharedModule {}
