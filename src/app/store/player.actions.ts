// Create host and clients
// Actions: Create Host, Create Client, Set/Get Host Session Id (that stores all chat texts), Set/Get Chat Text(with userId)

import firebase from 'firebase';
import User = firebase.User;

export class SetPlayer {
  static readonly type = '[Player] SetPlayer';

  constructor(public name: string | null, public hostId: string, public image: string | null ) {
  }
}

export class AddPlayer {
  static readonly type = '[Player] AddPlayer';

  constructor(public name: string | null, public hostId: string, public image: string | null ) {
  }
}

export class InitializePlayer {
  static readonly type = '[Player] InitializePlayer';

  constructor(public name: string | null, public hostId: string, public image: string | null ) {
  }
}

export class SetText {
  static readonly type = '[Player] SetText';

  constructor(public name: string | null ) {
  }
}

export class AddText {
  static readonly type = '[Player] AddText';

  constructor(public name: string | null ) {
  }
}

export class SetDrawing {
  static readonly type = '[Player] SetDrawing';

  constructor(public name: string | null ) {
  }
}

export class AddDrawing {
  static readonly type = '[Player] AddDrawing';

  constructor(public name: string | null ) {
  }
}

