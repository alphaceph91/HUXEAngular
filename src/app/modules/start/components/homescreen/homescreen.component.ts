import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {AuthState} from '../../../../store/auth.state';
import {AddHost, ChangeGameState, InitializeHost, SetHostByHost} from '../../../../store/host.actions';
import {AddPlayer, InitializePlayer} from '../../../../store/player.actions';
import {GameState} from '../../../../store/game.state';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Players } from '../../players';
import {SetGameState, SetPlayers} from '../../../../store/game.actions';
import {HostState} from '../../../../store/host.state';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
})
export class HomescreenComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store, private actions$: Actions) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  laughs: AnimationOptions = {
    path: '/assets/Animations/Laughs/1443-laughs.json',
  };
  write: AnimationOptions = {
    path: '/assets/Animations/writing/41460-writing.json',
  };
  draw: AnimationOptions = {
    path: '/assets/Animations/Drawing/8704-drawing-with-a-graphic-tablet.json',
  };
  guess: AnimationOptions = {
    path: '/assets/Animations/Thinking/43228-thinking-animation.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  pictureid = 0;
  selectedPlayer?: Players;
  selectedAvatar?: Players;
  hoverPlayer?: Players;
  form: FormGroup;
  submitted = false;
  click = false;
  hover = false;

  avatars: Array<Players> = [
    { id: 1, img: '1', color: '#36B1A7', colorHover: 'rgba(54,177,167,0.5)' },
    { id: 2, img: '2', color: '#019678', colorHover: 'rgba(1,150,120,0.5)' },
    { id: 3, img: '3', color: '#FC9CC7', colorHover: 'rgba(252,156,199,0.5)' },
    { id: 4, img: '4', color: '#5F5494', colorHover: 'rgba(95, 84, 148 ,0.5)' },
    { id: 5, img: '5', color: '#5F5494', colorHover: 'rgba(95, 84, 148 ,0.5)' },
    { id: 6, img: '6', color: '#E83942', colorHover: 'rgba(232, 57, 66 ,0.5)' },
    { id: 7, img: '7', color: '#019678', colorHover: 'rgba(1, 150, 120 ,0.5)' },
    { id: 8, img: '8', color: '#E83942', colorHover: 'rgba(232, 57, 66 ,0.5)' },
    { id: 9, img: '9', color: '#FBAE17', colorHover: 'rgba(251, 174, 23,0.5)' },
    {
      id: 10,
      img: '10',
      color: '#019678',
      colorHover: 'rgba(1, 150, 120 ,0.5)',
    },
    {
      id: 11,
      img: '11',
      color: '#36B1A7',
      colorHover: 'rgba(54, 177, 167,0.5)',
    },
    {
      id: 12,
      img: '12',
      color: '#FBAE17',
      colorHover: 'rgba(251, 174, 23,0.5)',
    },
  ];

  @Input() src: string;
  hostName: string;
  playerName: string;
  hostId: string;

  animationCreated(animationItem: AnimationItem): void {
  }

  next(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {
      console.log('VALIDATIOOON!');
      console.log(this.store.selectSnapshot(HostState.hostId));
      this.store.dispatch(new AddPlayer(this.playerName,
        this.store.selectSnapshot(HostState.hostId),
        './assets/Profiles/Animal_Faces/' + this.selectedAvatar.img + '.svg'))
        .subscribe(() => this.router.navigate(['/lobby']));
    }
  }
  ngOnInit(): void {
    // subscribe to game state change. To understand the change and route
    this.actions$.pipe(ofActionDispatched(SetGameState)).subscribe((payload) =>
    {
      console.log('payload.state');
      console.log(payload.state);
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onClick(avatar: Players): void {
    console.log(avatar);
    this.selectedAvatar = avatar;
  }

  onHover(player: Players): void {
    this.hoverPlayer = player;
  }
}
