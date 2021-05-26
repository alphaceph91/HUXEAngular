import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import firebase from 'firebase';
import User = firebase.User;
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {AuthState} from './auth.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {ListenToGameState, ListenToPlayersList, SetGameState, SetPlayers} from './game.actions';
import {HostState, HostStateModel} from './host.state';
import {switchMap, tap} from 'rxjs/operators';
import {PlayerState, PlayerStateModel} from './player.state';

// Game itself s under hostId doc.
// This is game state
// Game
//    GameState, Host, Players
// States: Init, Lobby, Text, Draw, Show, End
export interface GameStateModel {
  id: string;
  state: string;
  players: PlayerStateModel[];
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: {
    id: null,
    state: 'Init',
    players: null
  }
})

@Injectable()
export class GameState implements NgxsOnInit {
  constructor(private authService: AngularFireAuth,
              private angularFireStore: AngularFirestore,
              private store: Store) {
  }

  @Selector()
  static state(state: GameStateModel): string | null {
    return state.state || null;
  }

  @Selector()
  static players(state: GameStateModel): PlayerStateModel[] | null {
    return state.players || null;
  }

  ngxsOnInit(context?: StateContext<GameStateModel>): any {
  }

  @Action(SetGameState)
  setGameState(context: StateContext<GameStateModel>, action: SetGameState): void {
    context.patchState({
      state: action.state,
    });
  }

  @Action(SetPlayers)
  setPlayers(context: StateContext<GameStateModel>, action: SetPlayers): void {
    context.patchState({
      players: action.players,
    });
  }

  @Action(ListenToPlayersList)
  listenToPlayersList(context: StateContext<GameStateModel>, action: SetGameState): void {
    this.store.select(HostState.hostId)
      .pipe(
        switchMap(hostId => {
          if (hostId === null) {
            return of(null);
          } else {
            return this.angularFireStore
              .collection('game')
              .doc(hostId)
              .collection<any>('players')
              .valueChanges({
                idField: 'id'
              })
              .pipe(
                tap(players => {
                  context.dispatch(new SetPlayers(players));
                })
              );
          }
        })
      ).subscribe();
  }

  @Action(ListenToGameState)
  listenToGameState(context: StateContext<GameStateModel>, action: ListenToGameState): void {
    this.store.select(HostState.hostId)
      .pipe(
        switchMap(hostId => {
          if (hostId === null) {
            return of(null);
          } else {
            return this.angularFireStore
              .collection('game')
              .doc(hostId)
              .collection<any>('gamestate')
              .doc('state')
              .valueChanges({
                idField: 'id'
              })
              .pipe(
                tap(state => {
                  context.dispatch(new SetGameState(state));
                })
              );
          }
        })
      ).subscribe();
  }
}
