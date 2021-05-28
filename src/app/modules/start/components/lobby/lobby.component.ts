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
  hostId: string;
  difficultySelection = 0;

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

  flip(selection: number): void {
    this.flipval = !this.flipval;
    this.flipval2 = false;
    this.flipval3 = false;
    this.setDifficultySelection(selection);
  }

  flip2(selection: number): void {
    this.flipval2 = !this.flipval2;
    this.flipval3 = false;
    this.flipval = false;
    this.setDifficultySelection(selection);
  }

  flip3(selection: number): void {
    this.flipval3 = !this.flipval3;
    this.flipval2 = false;
    this.flipval = false;
    this.setDifficultySelection(selection);
  }

  setDifficultySelection(selection: number) {
    this.difficultySelection = selection;
  }

  constructor(private router: Router, private actions$: Actions, private store: Store, private firestore: AngularFirestore) {
  }

  next() {
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection('difficulty')
      .doc('difficultyDoc')
      .set({
        difficulty: this.difficultySelection
      }).then(() => {
      this.store.dispatch(new ChangeGameState('start'));
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (!this.store.selectSnapshot(HostState.hostId)) {
      this.router.navigate(['']);
    } else {
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('gamestate')
        .doc('state').valueChanges(value => {
      }).subscribe((stateInFirestore) => {
        if (stateInFirestore.state === 'start') {
          this.router.navigate(['/start']);
        } else if (stateInFirestore.state === 'drawing') {
          this.router.navigate(['/drawing']);
        } else if (stateInFirestore.state === 'description') {
          this.router.navigate(['/description']);
        } else if (stateInFirestore.state === 'results') {
          this.router.navigate(['/results']);
        }
      });
      this.store.dispatch(new ListenToPlayersList());
      // this.store.dispatch(new ListenToGameState());
      const hostId = this.store.selectSnapshot(HostState.hostId);
      const userId = this.store.selectSnapshot(AuthState.userId);
      if (hostId !== null) {
        this.isHost = hostId === userId;
        this.hostId = hostId;
      }
    }
  }
}
