import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './components/description/description.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { GameStartComponent } from './components/game-start/game-start.component';
import {GamelogicRoutingModule} from './gamelogic-routing.module';

import { LottieModule } from 'ngx-lottie';
import player, { LottiePlayer } from 'lottie-web';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StartRoutingModule} from "../start/start-routing.module";
import {NgxsModule} from "@ngxs/store";
import {HostState} from "../../store/host.state";
import {PlayerState} from "../../store/player.state";
import {GameState} from "../../store/game.state";

export function playerFactory(): LottiePlayer {
  return player;
}

@NgModule({
  declarations: [
    DescriptionComponent,
    DrawingEditorComponent,
    GameStartComponent,
  ],
  imports: [
    CommonModule,
    GamelogicRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    ReactiveFormsModule,
    StartRoutingModule,
    NgxsModule.forFeature([HostState]),
    NgxsModule.forFeature([PlayerState]),
    NgxsModule.forFeature([GameState]),
  ],
  exports: [DescriptionComponent, DrawingEditorComponent, GameStartComponent],
})
export class GamelogicModule {}
