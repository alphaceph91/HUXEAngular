import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import firebase from 'firebase';
import User = firebase.User;
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import {InitializeHost, SetHostByHost} from './host.actions';
import {from, Observable} from 'rxjs';
import {AuthState} from './auth.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {AddPlayer, InitializePlayer, SetPlayer} from './player.actions';
import {HostState} from './host.state';

// Player is ok. Host is ok
// Now render players in lobby.

export interface PlayerStateModel {
  id: string;
  name: string;
  playerId: string;
}

@State<PlayerStateModel>({
  name: 'playerState',
  defaults: {
    id: null,
    name: null,
    playerId: null,
  }
})

@Injectable()
export class PlayerState implements NgxsOnInit {
  constructor(private authService: AngularFireAuth,
              private angularFireStore: AngularFirestore,
              private store: Store) {
  }

  ngxsOnInit(context?: StateContext<any>): any {
    console.log('HOSTSTATEANAN');
  }

  @Action(SetPlayer)
  setPlayer(context: StateContext<PlayerStateModel>, action: SetPlayer): void {
    context.patchState({
      name: action.name,
      playerId: this.store.selectSnapshot(AuthState.userId)
    });
  }

  @Action(AddPlayer)
  addPlayer(context: StateContext<PlayerStateModel>, action: AddPlayer): Observable<any> {
    console.log('addPlayer');
    console.log(this.store.selectSnapshot(AuthState.userId));
    console.log(action.hostId);
    return from(this.angularFireStore
      .collection('game')
      .doc(action.hostId)
      .collection<any>('players')
      .doc(this.store.selectSnapshot(AuthState.userId))
      .set({
        name: action.name,
        playerId: this.store.selectSnapshot(AuthState.userId)
      }));
  }

  @Action(InitializePlayer)
  initializePlayer(context: StateContext<PlayerStateModel>, action: InitializePlayer): void {
    context.dispatch(new AddPlayer(action.name, action.hostId)).subscribe(() => {
      context.dispatch(new SetPlayer(action.name, action.hostId));
    });
  }
}
