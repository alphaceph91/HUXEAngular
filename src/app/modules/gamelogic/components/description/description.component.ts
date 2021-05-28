import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HostState} from "../../../../store/host.state";
import {AuthState} from "../../../../store/auth.state";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {

  shuffledDrawing: string;

  @Input() src: string;

  constructor(private router: Router, private firestore: AngularFirestore, private store: Store) {
  }

  next() {
    this.router.navigate(['/results']);
  }

  ngOnInit(): void {
    if (!this.store.selectSnapshot(HostState.hostId)) {
      this.router.navigate(['']);
    } else {
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('shuffledDrawings')
        .valueChanges()
        .subscribe((values) => {
          console.log('values');
          console.log('values');
          console.log(values);
          const resultingElement = values.find(element => {
            return element.id === this.store.selectSnapshot(AuthState.userId);
          });
          this.shuffledDrawing = resultingElement.drawing;
          console.log(this.shuffledDrawing);
        });
    }
  }
}
