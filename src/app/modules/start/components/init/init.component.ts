import { Component, OnInit } from '@angular/core';
import {Actions, ofActionCompleted, ofActionDispatched, ofActionSuccessful, Store} from "@ngxs/store";
import {ChangeGameState, InitializeHost, SetHostByHost, SetHostByPlayer} from "../../../../store/host.actions";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {InitializePlayer} from "../../../../store/player.actions";
import {AuthState} from "../../../../store/auth.state";
import {GetGameState, ListenToGameState, ListenToPlayersList, SetGameState} from "../../../../store/game.actions";

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  hostName: string;
  playerName: string;
  hostId: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store, private actions$: Actions) { }

  ngOnInit(): void {
    // subscribe to game state change. To understand the change and route
    this.actions$.pipe(ofActionSuccessful(SetGameState)).subscribe((payload) =>
    {
      if (payload.state === 'homescreen') {
        this.router.navigate(['/homescreen']);
      } else if (payload.state.state === 'lobby') {
        this.router.navigate(['/lobby']);
      }
    });
  }

  onHost(): void {
    this.store.dispatch([new InitializeHost(''),
      new InitializePlayer('', this.store.selectSnapshot(AuthState.userId), ''),
      new ListenToPlayersList(),
      new ChangeGameState('homescreen'), new ListenToGameState()
    ]);
  }

  // new GetGameState(this.hostId) for going directly to gamestate. However we need to check if the name is defined.
  onPlay(): void {
    if (this.hostId) {
      this.store.dispatch([new SetHostByPlayer(this.hostId),
        new InitializePlayer('', this.hostId, ''),
        new ListenToPlayersList(),
        ]).subscribe(() => this.router.navigate(['/homescreen']));
    }
  }

}
