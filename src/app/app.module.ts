import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamelogicModule } from './modules/gamelogic/gamelogic.module';
import { StartModule } from './modules/start/start.module';
import { EndModule } from './modules/end/end.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamelogicModule,
    StartModule,
    EndModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
