// Create host and clients
// Actions: Create Host, Create Client, Set/Get Host Session Id (that stores all chat texts), Set/Get Chat Text(with userId)

import firebase from 'firebase';
import User = firebase.User;
import {PlayerStateModel} from './player.state';

export class SetGameState {
  static readonly type = '[Game] SetGameState';

  constructor(public state: string | null) {
  }
}

export class ListenToGameState {
  static readonly type = '[Game] ListenToGameState';

  constructor() {
  }
}

export class ListenToPlayersList {
  static readonly type = '[Game] ListenToPlayersList';

  constructor() {
  }
}

export class SetPlayers {
  static readonly type = '[Game] SetPlayers';

  constructor(public players: PlayerStateModel[] | null) {
  }
}

