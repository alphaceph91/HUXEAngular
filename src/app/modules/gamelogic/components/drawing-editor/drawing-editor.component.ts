import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy, OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {Store} from "@ngxs/store";
import {AngularFirestore} from "@angular/fire/firestore";
import {HostState} from "../../../../store/host.state";
import {AuthState} from "../../../../store/auth.state";

declare interface Position {
  offsetX: number;
  offsetY: number;
}

@Component({
  selector: 'app-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.components.scss'],
})
export class DrawingEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  isHost: boolean;
  shuffledText: string;

  base64DrawingImage: any;

  @ViewChild('drawingCanvas')
  canvas: ElementRef<HTMLCanvasElement> | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  color = 'red';
  @Output() drawingChanged = new EventEmitter<{ base64: string }>();
  colors: Array<string> = ['green', 'black', 'red', 'blue', 'yellow', 'purple'];
  mouseX: number | undefined;
  mouseY: number | undefined;
  img = '';
  position:
    | [
    {
      start: {};
      stop: {};
      color: string;
    }
  ]
    | undefined;
  line = [];
  prevPos: Position = {
    offsetX: 0,
    offsetY: 0,
  };
  currentyDrawing = false;
  refreshImg: any;
  mouseUpSubscription: any;

  constructor(private router: Router, private store: Store, private firestore: AngularFirestore) {
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.captureEvents(this.canvas?.nativeElement);
  }

  getColor(): void {
    if (this.color === 'red') {
      this.ctx.strokeStyle = this.color;
    }
    if (this.color === 'green') {
      this.ctx.strokeStyle = this.color;
    }
    if (this.color === 'black') {
      this.ctx.strokeStyle = this.color;
    }
    if (this.color === 'blue') {
      this.ctx.strokeStyle = this.color;
    }
    if (this.color === 'yellow') {
      this.ctx.strokeStyle = this.color;
    }
    if (this.color === 'purple') {
      this.ctx.strokeStyle = this.color;
    }
  }

  onClick(color: string): void {
    this.color = color;
  }

  clear(): void {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.ctx.fillStyle = '#FFF';
    this.drawingChanged.emit({
      base64: this.canvas?.nativeElement.toDataURL(),
    });
  }

  private captureEvents(canvasEl: HTMLCanvasElement): void {
    this.mouseUpSubscription = fromEvent(canvasEl, 'mouseup')
      .pipe(delay(500))
      .subscribe(() => {
        this.drawingChanged.emit({
          base64: this.canvas?.nativeElement.toDataURL(),
        });
      });
  }

  @HostListener('mouseleave')
  onmouseleave(): void {
    this.currentyDrawing = false;
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.currentyDrawing = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove({offsetX, offsetY}): void {
    if (this.currentyDrawing) {
      const offSetData = {offsetX, offsetY};
      this.position = [
        {
          start: {...this.prevPos},
          stop: {...offSetData},
          color: this.color,
        },
      ];
      this.line = this.line.concat(this.position);
      this.draw(this.prevPos, offSetData);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(offsetX: number, offsetY: number): void {
    this.currentyDrawing = true;
    this.prevPos = {
      offsetX,
      offsetY,
    };
  }

  draw(
    {offsetX: x, offsetY: y}: Position,
    {offsetX, offsetY}: Position
  ): void {
    // begin drawing
    this.ctx.beginPath();
    this.getColor();
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 8;
    this.ctx.moveTo(x, y);
    this.img = this.canvas.nativeElement.toDataURL();
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = {
      offsetX,
      offsetY,
    };
  }

  ngOnDestroy(): void {
    this.mouseUpSubscription?.unsubscribe();
  }

  next() {
    console.log('SUBSCRIBE');
    console.log(this.base64DrawingImage);
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection('initialDrawings')
      .doc(this.store.selectSnapshot(AuthState.userId))
      .set({
        drawing: this.base64DrawingImage,
        id: this.store.selectSnapshot(AuthState.userId)
      });
    /*this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection('initialStories')
      .doc(this.store.selectSnapshot(AuthState.userId))
      .set({
        story: this.story,
        id: this.store.selectSnapshot(AuthState.userId)
      });*/
    // this.router.navigate(['/describe']);
  }

  shuffleArray(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // base64DrawingImage

  ngOnInit(): void {
    // Check Host State. It has to be defined.
    if (!this.store.selectSnapshot(HostState.hostId)) {
      this.router.navigate(['']);
    } else {

      // Route regarding to game state
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('gamestate')
        .doc('state')
        .valueChanges()
        .subscribe(newState => {
          if (newState.state === 'description') {
            this.router.navigate(['/description']);
          }
        });

      // Store drawing locally on drawing event emitter subscribe.
      this.drawingChanged.subscribe((base64Image) => {
        this.base64DrawingImage = base64Image.base64;
      });

      // Subscribe to changes in shuffled text
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('shuffledStories')
        .valueChanges()
        .subscribe((values) => {
          console.log('values');
          console.log('values');
          console.log(values);
          const resultingElement = values.find(element => {
            return element.id === this.store.selectSnapshot(AuthState.userId);
          });
          this.shuffledText = resultingElement.story;
        });

      // Check if the user host.
      this.isHost = this.store.selectSnapshot(HostState.hostId) === this.store.selectSnapshot(AuthState.userId);

      // Only host can set the state. If everyone finishes drawing, then set to description.
      if (this.isHost) {
        // Set game state if everyone has finished drawing
        this.firestore.collection('game')
          .doc(this.store.selectSnapshot(HostState.hostId))
          .collection<any>('initialDrawings')
          .valueChanges()
          .subscribe(allDrawings => {
            if (allDrawings.length === 2) {
              const storyArray = [];
              const userIdArray = [];
              allDrawings.forEach((doc) => {
                console.log(doc);
                console.log(doc.drawing);
                storyArray.push(doc.drawing);
                userIdArray.push(doc.id);
              });
              this.shuffleArray(storyArray);
              userIdArray.forEach((element, index) => {
                this.firestore.collection('game')
                  .doc(this.store.selectSnapshot(HostState.hostId))
                  .collection<any>('shuffledDrawings')
                  .doc(element)
                  .set(
                    {
                      drawing: storyArray[index],
                      id: element
                    });
              });
            }
          });

        // Check shuffled drawings and set game state
        this.firestore.collection('game')
          .doc(this.store.selectSnapshot(HostState.hostId))
          .collection<any>('shuffledDrawings')
          .valueChanges()
          .subscribe((shuffledDrawings) => {
            if (shuffledDrawings.length === 2) {
              this.firestore.collection('game')
                .doc(this.store.selectSnapshot(HostState.hostId))
                .collection<any>('gamestate')
                .doc('state')
                .set({
                  state: 'description',
                });
            }
          });
      }
    }
  }
}

/*
set game state:
this.firestore.collection('game')
                .doc(this.store.selectSnapshot(HostState.hostId))
                .collection<any>('gamestate')
                .doc('state')
                .set({
                  state: 'description',
                });
 */

// Get strings and ids as arrays
// Shuffle them
// Create a new firebase collection shuffledStories and push the shuffled ones there.
// Then subscribe to the changes in that storage and create a state for the user's shown text
// Then subscribe to the state and get the text to draw.

// The things that needed now.
/*
Lets say we are okay with not having hostId out of state
Then, we will need to skip name selection after entering the game.
The only way is to check if image and name is selected. Then, we do not need to
get there again if the information is already stored.

Other one is getting the game state on lobby. We should fetch the state and act regarding to that.

I think it is okay to store hostId and userId in state.
Also the players can stay in state.
The others can stay outside

I think we should give error on all pages if there is no HostID defined.

- Check Lobby state management. Do it just like it is in text draw

- On very enter, check user state if exists in firestore
- If not, set user with ID and send to HomeScreen
- If yes bit no name || no iamge, send to HomeScreen
- If yes and everything is fine, get the state and send to related page

- If hostId is lost, show an error and send to restart screen for entering hostId

- Then send drawings to firebase with shuffling and id the way you did with first stories

- Then show drawings to get descriptions

- Then show everything at once one by one

- Project finished

-Then, if there is time, check errors. Limit entering after 4 people joins and stuff.

 */

// Send shuffled text to there
