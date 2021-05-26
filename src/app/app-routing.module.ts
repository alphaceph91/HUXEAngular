import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule)
}, {
  path: 'game',
  loadChildren: () => import('./modules/gamelogic/gamelogic.module').then(m => m.GamelogicModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
