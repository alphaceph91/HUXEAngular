import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamelogicModule } from './modules/gamelogic/gamelogic.module';
import { StartModule } from './modules/start/start.module';
import { EndModule } from './modules/end/end.module';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AuthState} from './store/auth.state';
import {GameState} from './store/game.state';

const appInitFn = (angularAuth: AngularFireAuth) => {
  return () => angularAuth.signInAnonymously();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxsModule.forRoot([AuthState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: appInitFn,
    deps: [AngularFireAuth]
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
