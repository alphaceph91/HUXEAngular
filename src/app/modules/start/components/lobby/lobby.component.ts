import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, ofActionSuccessful, Select, Store} from "@ngxs/store";
import {AuthState} from "../../../../store/auth.state";
import {Observable} from "rxjs";
import {GameState} from "../../../../store/game.state";
import {ListenToGameState, ListenToPlayersList, SetGameState, SetPlayers} from "../../../../store/game.actions";
import {HostState} from "../../../../store/host.state";
import firebase from "firebase";
import Auth = firebase.auth.Auth;
import {host} from "@angular-devkit/build-angular/src/test-utils";
import {ChangeGameState} from "../../../../store/host.actions";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Select(GameState.players) players$: Observable<any>;

  isHost: boolean;

  playerNumber = ['4', '6', '8', '10'];
  num = 4;
  flipval = false;
  flipval2 = false;
  flipval3 = false;

  changeNumber(e): void {
    console.log(e.target.value);
    if (e.target.value.slice(0, 1).includes('1') === true) {
      this.num = parseInt(e.target.value.slice(0, 2), 10);
    } else {
      this.num = parseInt(e.target.value.slice(0, 1), 10);
    }
  }

  flip(): void {
    this.flipval = !this.flipval;
    this.flipval2 = false;
    this.flipval3 = false;
  }

  flip2(): void {
    this.flipval2 = !this.flipval2;
    this.flipval3 = false;
    this.flipval = false;
  }

  flip3(): void {
    this.flipval3 = !this.flipval3;
    this.flipval2 = false;
    this.flipval = false;
  }

  constructor(private router: Router, private actions$: Actions, private store: Store, private firestore: AngularFirestore) {
  }

  next() {
    this.store.dispatch(new ChangeGameState('start'));
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection<any>('gamestate')
      .doc('state').valueChanges(value => {
    }).subscribe((stateInFirestore) => {
      if (stateInFirestore.state === 'start') {
        this.router.navigate(['/start']);
      }
    });
    this.store.dispatch(new ListenToPlayersList());
    // this.store.dispatch(new ListenToGameState());
    if (this.isHost) {
      this.store.dispatch(new ChangeGameState('lobby'));
    }
    const hostId = this.store.selectSnapshot(HostState.hostId);
    const userId = this.store.selectSnapshot(AuthState.userId);
    if (hostId !== null) {
      this.isHost = hostId === userId;
    }
  }
}
