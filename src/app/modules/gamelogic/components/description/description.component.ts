import { Component, Host, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostState } from '../../../../store/host.state';
import { AuthState } from '../../../../store/auth.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';
import { GameState } from '../../../../store/game.state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  shuffledDrawing: string;
  descriptionText: string;

  @Input() src: string;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private store: Store
  ) {}

  next(): void {
    this.firestore
      .collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection('descriptionTexts')
      .doc(this.store.selectSnapshot(AuthState.userId))
      .set({
        description: this.descriptionText,
        id: this.store.selectSnapshot(AuthState.userId),
      });
  }

  ngOnInit(): void {
    // Check if host defined
    if (!this.store.selectSnapshot(HostState.hostId)) {
      this.router.navigate(['']);
    } else {
      // Get Shuffled Drawings to show
      this.firestore
        .collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('shuffledDrawings')
        .valueChanges()
        .subscribe((values) => {
          console.log('values');
          console.log('values');
          console.log(values);
          const resultingElement = values.find((element) => {
            return element.id === this.store.selectSnapshot(AuthState.userId);
          });
          this.shuffledDrawing = resultingElement.drawing;
          console.log(this.shuffledDrawing);
        });

      // Check descriptions and set game state.
      this.firestore
        .collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('descriptionTexts')
        .valueChanges()
        .subscribe((descriptionTexts) => {
          if (
            descriptionTexts.length ===
            this.store.selectSnapshot(GameState.players).length
          ) {
            this.firestore
              .collection('game')
              .doc(this.store.selectSnapshot(HostState.hostId))
              .collection<any>('gamestate')
              .doc('state')
              .set({
                state: 'results',
              });
          }
        });

      // Listen to game state changes in firestore
      this.firestore
        .collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('gamestate')
        .doc('state')
        .valueChanges()
        .subscribe((newState) => {
          if (newState.state === 'results') {
            this.router.navigate(['/results']);
          }
        });
    }
  }
}
