import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {StartRoutingModule} from './start-routing.module';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from '../../store/auth.state';
import {HostState} from '../../store/host.state';
import {PlayerState} from '../../store/player.state';
import {GameState} from "../../store/game.state";

import { LottieModule } from 'ngx-lottie';
import player, { LottiePlayer } from 'lottie-web';

export function playerFactory(): LottiePlayer {
  return player;
}

@NgModule({
  declarations: [HomescreenComponent, LobbyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StartRoutingModule,
    NgxsModule.forFeature([HostState]),
    NgxsModule.forFeature([PlayerState]),
    NgxsModule.forFeature([GameState]),
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [HomescreenComponent, LobbyComponent],
})
export class StartModule {}
