import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomescreenComponent} from './components/homescreen/homescreen.component';
import {LobbyComponent} from './components/lobby/lobby.component';
import {InitComponent} from './components/init/init.component';

const routes: Routes = [{
  path: '',
  component: InitComponent
},
  {
    path: 'homescreen',
    component: HomescreenComponent
  },
  {
  path: 'lobby',
  component: LobbyComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
