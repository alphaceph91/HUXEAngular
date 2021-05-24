import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './components/description/description.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { GameStartComponent } from './components/game-start/game-start.component';

import { LottieModule } from 'ngx-lottie';
import player, { LottiePlayer } from 'lottie-web';

export function playerFactory(): LottiePlayer {
  return player;
}

@NgModule({
  declarations: [
    DescriptionComponent,
    DrawingEditorComponent,
    GameStartComponent,
  ],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [DescriptionComponent, DrawingEditorComponent, GameStartComponent],
})
export class GamelogicModule {}
