import { Component, OnInit } from '@angular/core';
import {Actions, ofActionDispatched, Store} from "@ngxs/store";
import {ChangeGameState, InitializeHost, SetHost} from "../../../../store/host.actions";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {InitializePlayer} from "../../../../store/player.actions";
import {AuthState} from "../../../../store/auth.state";

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
    this.actions$.pipe(ofActionDispatched(ChangeGameState)).subscribe((payload) =>
    {
      console.log('payload.state');
      console.log(payload.state);
    });
  }

  onHost(): void {
    if (this.hostName) {
      this.store.dispatch([new InitializeHost(''),
        new InitializePlayer('', this.store.selectSnapshot(AuthState.userId)),
        new ChangeGameState('Name')
      ]);
    }
  }

  onPlay(): void {
    if (this.hostName) {
      this.store.dispatch([new SetHost(this.hostName),
        new InitializePlayer('', this.store.selectSnapshot(AuthState.userId))]);
    }
  }

}
