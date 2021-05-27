import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './modules/end/components/results/results.component';
import { DescriptionComponent } from './modules/gamelogic/components/description/description.component';
import { DrawingEditorComponent } from './modules/gamelogic/components/drawing-editor/drawing-editor.component';
import { GameStartComponent } from './modules/gamelogic/components/game-start/game-start.component';
import { HomescreenComponent } from './modules/start/components/homescreen/homescreen.component';
import { LobbyComponent } from './modules/start/components/lobby/lobby.component';
import {InitComponent} from './modules/start/components/init/init.component';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule)
},
  {
    path: 'game',
    loadChildren: () => import('./modules/gamelogic/gamelogic.module').then(m => m.GamelogicModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
