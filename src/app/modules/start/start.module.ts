import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomescreenComponent, LobbyComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [HomescreenComponent, LobbyComponent],
})
export class StartModule {}
