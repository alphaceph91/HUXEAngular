import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './modules/end/components/results/results.component';
import { DescriptionComponent } from './modules/gamelogic/components/description/description.component';
import { DrawingEditorComponent } from './modules/gamelogic/components/drawing-editor/drawing-editor.component';
import { GameStartComponent } from './modules/gamelogic/components/game-start/game-start.component';
import { HomescreenComponent } from './modules/start/components/homescreen/homescreen.component';
import { LobbyComponent } from './modules/start/components/lobby/lobby.component';

const routes: Routes = [
  { path: '', component: HomescreenComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'first', component: GameStartComponent },
  { path: 'draw', component: DrawingEditorComponent },
  { path: 'describe', component: DescriptionComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
