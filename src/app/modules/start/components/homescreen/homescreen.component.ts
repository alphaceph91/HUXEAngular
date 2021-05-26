import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {AuthState} from "../../../../store/auth.state";
import {AddHost, ChangeGameState, InitializeHost, SetHost} from "../../../../store/host.actions";
import {AddPlayer, InitializePlayer} from "../../../../store/player.actions";
import {GameState} from "../../../../store/game.state";

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
})
export class HomescreenComponent implements OnInit {
  click1: boolean = false;
  hover1: boolean = false;

  click2: boolean = false;
  hover2: boolean = false;

  click3: boolean = false;
  hover3: boolean = false;

  click4: boolean = false;
  hover4: boolean = false;

  click5: boolean = false;
  hover5: boolean = false;

  click6: boolean = false;
  hover6: boolean = false;

  click7: boolean = false;
  hover7: boolean = false;

  click8: boolean = false;
  hover8: boolean = false;

  click9: boolean = false;
  hover9: boolean = false;

  click10: boolean = false;
  hover10: boolean = false;

  click11: boolean = false;
  hover11: boolean = false;

  click12: boolean = false;
  hover12: boolean = false;

  images: Array<string> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  colors: Array<string> = [
    '#36b1a7',
    '#fbae17',
    '#5f5494',
    '#fc9cc7',
    '#e83942',
    '#019678',
    '#e83942',
    '#019678',
    '#36b1a7',
    '#fbae17',
    '#5f5494',
    '#fc9cc7',
  ];
  colorshalf: Array<string> = [
    'rgba(54, 177, 167,0.5)',
    'rgba(251, 174, 23, 0.5)',
    'rgba(95, 84, 148,0.5)',
    'rgba(252, 156, 199,0.5)',
    'rgba(232, 57, 66,0.5)',
    'rgba(1, 150, 120, 0.5)',
    'rgba(54, 177, 167,0.5)',
    'rgba(251, 174, 23, 0.5)',
    'rgba(95, 84, 148,0.5)',
    'rgba(252, 156, 199,0.5)',
    'rgba(232, 57, 66,0.5)',
    'rgba(1, 150, 120, 0.5)',
  ];

  @ViewChild('avatars')
  avatars: ElementRef<HTMLDivElement> | null = null;
  @Input() src: string;
  hostName: string;
  playerName: string;
  hostId: string;

  constructor(private store: Store, private actions$: Actions) {}

  onClick(color: string): void {
    this.avatars.nativeElement.style.backgroundColor = color;
    console.log(color);
  }
  onHover(color: string): void {
    this.avatars.nativeElement.style.backgroundColor = color;
    console.log(color);
  }
  ngOnInit(): void {
    this.actions$.pipe(ofActionDispatched(ChangeGameState)).subscribe((payload) =>
    {
      console.log('payload.state');
      console.log(payload.state);
    });
  }

  onHost(): void {
    if (this.hostName) {
      this.store.dispatch([new InitializeHost(this.hostName),
        new InitializePlayer(this.hostName, this.store.selectSnapshot(AuthState.userId)),
        new ChangeGameState('Lobby')
      ]);
    }
  }

  onPlay(): void {
    if (this.hostName) {
      this.store.dispatch([new SetHost(this.hostName),
        new InitializePlayer(this.hostName, this.store.selectSnapshot(AuthState.userId))]);
    }
  }
}
