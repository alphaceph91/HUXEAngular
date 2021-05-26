import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import firebase from 'firebase';
import User = firebase.User;
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import {AddHost, ChangeGameState, InitializeHost, SetHost, SetHostByPlayer, SetHostWithId} from './host.actions';
import {from, Observable} from 'rxjs';
import {AuthState} from './auth.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {GameStateModel} from './game.state';
import {tap} from "rxjs/operators";
import {SetPlayers} from "./game.actions";

export interface HostStateModel {
  id: string;
  name: string;
  hostId: string;
}

@State<HostStateModel>({
  name: 'hostState',
  defaults: {
    id: null,
    name: null,
    hostId: null
  }
})

@Injectable()
export class HostState implements NgxsOnInit {
  constructor(private authService: AngularFireAuth,
              private angularFireStore: AngularFirestore,
              private store: Store) {
  }

  ngxsOnInit(context?: StateContext<HostStateModel>): any {
  }

  @Selector()
  static hostId(state: HostStateModel): string | null {
    return state.hostId || null;
  }

  @Action(SetHost)
  setHost(context: StateContext<HostStateModel>, action: SetHost): void {
    context.patchState({
      name: action.name,
      hostId: this.store.selectSnapshot(AuthState.userId)
    });
  }

  @Action(SetHostByPlayer)
  setHostByPlayer(context: StateContext<HostStateModel>, action: SetHostByPlayer): Observable<any> {
    return this.angularFireStore
      .collection('game')
      .doc(action.hostId)
      .collection<any>('host')
      .get()
      .pipe(
        tap(host => {
          context.dispatch(new SetHostWithId(host.name, host.hostId));
        })
      );
  }

  @Action(SetHostWithId)
  setHostWithId(context: StateContext<HostStateModel>, action: SetHostWithId): void {
    context.patchState({
      name: action.name,
      hostId: action.hostId
    });
  }

  @Action(AddHost)
  addHost(context: StateContext<HostStateModel>, action: AddHost): Observable<any> {
    const hostId = this.store.selectSnapshot(AuthState.userId);
    console.log(hostId);
    return from(this.angularFireStore
      .collection('game')
      .doc(hostId)
      .collection<Partial<any>>('host')
      .doc('host')
      .set({
        name: action.name,
        hostId
      }));
  }

  @Action(InitializeHost)
  initializeHost(context: StateContext<HostStateModel>, action: InitializeHost): void {
    context.dispatch(new AddHost(action.name)).subscribe(() => {
      context.dispatch(new SetHost(action.name));
    });
  }

  @Action(ChangeGameState)
  changeGameState(context: StateContext<GameStateModel>, action: ChangeGameState): Observable<any> {
    const hostId = this.store.selectSnapshot(AuthState.userId);
    return from(this.angularFireStore
      .collection('game')
      .doc(hostId)
      .collection<Partial<any>>('gamestate')
      .doc('state')
      .set({
        state: action.state
      }));
  }
}
