import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DescriptionComponent} from './components/description/description.component';
import {DrawingEditorComponent} from './components/drawing-editor/drawing-editor.component';

const routes: Routes = [{
  path: 'description',
  component: DescriptionComponent
}, {
  path: 'drawing',
  component: DrawingEditorComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamelogicRoutingModule { }
