import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './components/description/description.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';

@NgModule({
  declarations: [DescriptionComponent, DrawingEditorComponent],
  imports: [CommonModule],
  exports: [DescriptionComponent, DrawingEditorComponent],
})
export class GamelogicModule {}
