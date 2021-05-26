import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import firebase from 'firebase';
import User = firebase.User;
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import {AddHost, ChangeGameState, InitializeHost, SetHostByHost, SetHostByPlayer, SetHostWithId} from './host.actions';
import {from, Observable} from 'rxjs';
import {AuthState} from './auth.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {GameStateModel} from './game.state';
import {tap} from "rxjs/operators";
import {SetPlayers} from "./game.actions";
import {host} from "@angular-devkit/build-angular/src/test-utils";

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

  ngxsOnInit(context?: StateContext<HostStateModel>): void {
    console.log('HOSTSTATEANAN');
  }

  @Selector()
  static hostId(state: HostStateModel): string | null {
    return state.hostId || null;
  }

  @Action(SetHostByHost)
  setHostByHost(context: StateContext<HostStateModel>, action: SetHostByHost): void {
    context.patchState({
      name: action.name,
      hostId: this.store.selectSnapshot(AuthState.userId)
    });
  }

  @Action(SetHostByPlayer)
  setHostByPlayer(context: StateContext<HostStateModel>, action: SetHostByPlayer): Observable<any> {
    console.log('setHostByPlayer');
    return this.angularFireStore
      .collection('game')
      .doc(action.hostId)
      .collection<any>('host')
      .doc('host')
      .get()
      .pipe(
        tap(hostInformation => {
          console.log('hostInformation');
          console.log(hostInformation);
          console.log(hostInformation._delegate._document.data.partialValue.mapValue.fields.hostId.stringValue);
          context.dispatch(new SetHostWithId(hostInformation._delegate._document.data.partialValue.mapValue.fields.name.stringValue,
            hostInformation._delegate._document.data.partialValue.mapValue.fields.hostId.stringValue));
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
  initializeHost(context: StateContext<HostStateModel>, action: InitializeHost): any {
    context.dispatch(new AddHost(action.name)).subscribe(() => {
      context.dispatch(new SetHostByHost(action.name));
    });
  }

  @Action(ChangeGameState)
  changeGameState(context: StateContext<GameStateModel>, action: ChangeGameState): Observable<any> {
    const authID = this.store.selectSnapshot(AuthState.userId);
    console.log('authID');
    console.log('authchangeGameStateID');
    console.log(authID);
    return from(this.angularFireStore
      .collection('game')
      .doc(authID)
      .collection<Partial<any>>('gamestate')
      .doc('state')
      .set({
        state: action.state
      }));
  }
}
