import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AnimationItem} from 'lottie-web';
import {AnimationOptions} from 'ngx-lottie';
import {Store} from '@ngxs/store';
import {AngularFirestore} from '@angular/fire/firestore';
import {HostState} from '../../../../store/host.state';
import {AuthState} from '../../../../store/auth.state';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {

  story: string;
  isHost: boolean;

  constructor(private router: Router, private store: Store, private firestore: AngularFirestore) {
  }

  ufo: AnimationOptions = {
    path: '/assets/Animations/UFO/61191-ufos.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '700px',
    marginLeft: '15%',
  };

  next(): void {
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection('initialStories')
      .doc(this.store.selectSnapshot(AuthState.userId))
      .set({
        story: this.story,
        id: this.store.selectSnapshot(AuthState.userId)
      });


    // add to firestore
    // if host, check the length of text[]
    // if 4, then change the game state in firestore
    // listen to game state changes for all
    // then route the game
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
    this.isHost = this.store.selectSnapshot(HostState.hostId) === this.store.selectSnapshot(AuthState.userId);
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection<any>('gamestate')
      .doc('state')
      .valueChanges()
      .subscribe(newState => {
        if (newState.state === 'drawing') {
          this.router.navigate(['/drawing']);
        }
      });

    if (this.isHost) {
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('initialStories')
        .valueChanges()
        .subscribe(allStories => {
          if (allStories.length === 2) {
            this.firestore.collection('game')
              .doc(this.store.selectSnapshot(HostState.hostId))
              .collection<any>('gamestate')
              .doc('state')
              .set({
                state: 'drawing',
              });
          }
        });
    }

  }
}
