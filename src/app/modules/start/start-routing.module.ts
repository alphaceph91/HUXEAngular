import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomescreenComponent} from './components/homescreen/homescreen.component';
import {LobbyComponent} from './components/lobby/lobby.component';

const routes: Routes = [{
  path: '',
  component: HomescreenComponent
}, {
  path: 'lobby',
  component: LobbyComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
