import {Component, Host, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {AngularFirestore} from "@angular/fire/firestore";
import {HostState} from "../../../../store/host.state";


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})

export class ResultsComponent implements OnInit {


  num = 4;

  players = [];
  initialStories = [];
  drawings = [];
  descriptions = [];

  currentPlayer = {
    name: '',
    id: '',
    image: ''
  };
  currentInitialStoryPlayer: string;
  currentInitialStory: string;
  currentDrawingPlayer: string;
  currentDrawing: string;
  currentDescriptionPlayer: string;
  currentDescription: string;

  constructor(private router: Router, private store: Store, private firestore: AngularFirestore) {
  }

  back() {
    this.router.navigate(['/describe']);
  }

  ngOnInit(): void {
    if (!this.store.selectSnapshot(HostState.hostId)) {
      this.router.navigate(['']);
    } else {
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection('players')
        .valueChanges()
        .subscribe((playerList) => {
          this.players = playerList;
          this.firestore.collection('game')
            .doc(this.store.selectSnapshot(HostState.hostId))
            .collection('shuffledStories')
            .valueChanges()
            .subscribe((initialStoryList) => {
              this.initialStories = initialStoryList;
              this.firestore.collection('game')
                .doc(this.store.selectSnapshot(HostState.hostId))
                .collection('initialDrawings')
                .valueChanges()
                .subscribe(initialDrawingList => {
                  this.drawings = initialDrawingList;
                  this.firestore.collection('game')
                    .doc(this.store.selectSnapshot(HostState.hostId))
                    .collection('descriptionTexts')
                    .valueChanges()
                    .subscribe(descriptionTextList => {
                      this.descriptions = descriptionTextList;
                      this.players.forEach((playerElement, playerIndex) => {
                        setTimeout(() => {
                          console.log(playerIndex);
                          console.log(playerIndex);
                          console.log(playerIndex);
                          this.currentPlayer = playerElement;
                          this.currentInitialStory = initialStoryList[playerIndex].story;
                          this.currentInitialStoryPlayer = this.players.find((value) => {
                            return initialStoryList[playerIndex].id === value.id;
                          });
                          this.currentDrawing = initialDrawingList[playerIndex].drawing;
                          this.currentDrawingPlayer = this.players.find((value) => {
                            return initialDrawingList[playerIndex].id === value.id;
                          });
                          this.currentDescription = descriptionTextList[playerIndex].description;
                          this.currentDescriptionPlayer = this.players.find((value) => {
                            return descriptionTextList[playerIndex].id === value.id;
                          });
                        }, 5000 * (playerIndex));
                      });
                    });
                });
            });
        });

      /*
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection('initialStories')
        .valueChanges()
        .subscribe((initialStoryList) => {
          this.initialStories = initialStoryList;
        });
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection('initialDrawings')
        .valueChanges()
        .subscribe(initialDrawingList => {
          this.drawings = initialDrawingList;
        });
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection('descriptionTexts')
        .valueChanges()
        .subscribe(descriptionTextList => {
          this.descriptions = descriptionTextList;
        });
       */
    }
  }
}
