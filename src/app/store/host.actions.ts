// Create host and clients
// Actions: Create Host, Create Client, Set/Get Host Session Id (that stores all chat texts), Set/Get Chat Text(with userId)

import firebase from 'firebase';
import User = firebase.User;

export class SetHost {
  static readonly type = '[Host] SetHost';

  constructor(public name: string | null ) {
  }
}

export class SetHostByPlayer {
  static readonly type = '[Host] SetHostByPlayer';

  constructor(public hostId: string | null ) {
  }
}

export class SetHostWithId {
  static readonly type = '[Host] SetHostWithId';

  constructor(public name: string | null, public hostId: string | null ) {
  }
}

export class AddHost {
  static readonly type = '[Host] AddHost';

  constructor(public name: string | null ) {
  }
}

export class InitializeHost {
  static readonly type = '[Host] InitializeHost';

  constructor(public name: string | null) {
  }
}

export class ChangeGameState {
  static readonly type = '[Host] ChangeGameState';

  constructor(public state: string | null) {
  }
}
