import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [HomescreenComponent, LobbyComponent],
})
export class StartModule {}
