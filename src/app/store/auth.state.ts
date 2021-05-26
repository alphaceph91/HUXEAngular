import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import firebase from 'firebase';
import User = firebase.User;
import {UserChanged} from './auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';

export interface AuthStateModel {
  user: User;
}

@State<AuthStateModel>({
  name: 'authState',
  defaults: {
    user: null
  }
})
@Injectable()
export class AuthState implements NgxsOnInit {
  constructor(private authService: AngularFireAuth) {
    // authSgate retuns an ovbservable that emits anychanges to the user sesesion
    // Once the user signed in it will emit the value, also on user sign out.
  }

  @Selector()
  static userId(state: AuthStateModel): string | null {
    console.log('userID is called!');
    return state.user?.uid || null;
  }

  ngxsOnInit(context?: StateContext<AuthStateModel>): any {
    // Means that the state hes been setup and working properly.
    // This is a chance to setup/emit user changes.
    console.log('AUTHSTATEINIT');
    this.authService.authState.subscribe(user => {
      context.dispatch(new UserChanged(user));
    });
  }

  @Action(UserChanged)
  userChanged(context: StateContext<AuthStateModel>, action: UserChanged): void {
    context.patchState({
      user: action.user
    });
  }
}
