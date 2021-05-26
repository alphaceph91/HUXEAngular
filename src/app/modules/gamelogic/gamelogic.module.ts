import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './components/description/description.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { GameStartComponent } from './components/game-start/game-start.component';
import {GamelogicRoutingModule} from './gamelogic-routing.module';

@NgModule({
  declarations: [
    DescriptionComponent,
    DrawingEditorComponent,
    GameStartComponent,
  ],
  imports: [CommonModule, GamelogicRoutingModule],
  exports: [DescriptionComponent, DrawingEditorComponent, GameStartComponent],
})
export class GamelogicModule {}
