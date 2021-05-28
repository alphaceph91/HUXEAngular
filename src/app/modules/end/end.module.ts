import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './components/results/results.component';
import {EndRoutingModule} from './end-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StartRoutingModule} from '../start/start-routing.module';
import {NgxsModule} from '@ngxs/store';
import {HostState} from '../../store/host.state';
import {PlayerState} from '../../store/player.state';
import {GameState} from '../../store/game.state';

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    EndRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StartRoutingModule,
    NgxsModule.forFeature([HostState]),
    NgxsModule.forFeature([PlayerState]),
    NgxsModule.forFeature([GameState]),
  ],
  exports: [ResultsComponent],
})
export class EndModule {}
