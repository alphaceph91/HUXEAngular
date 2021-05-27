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

  next() {
    this.router.navigate(['/describe']);
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

  shuffleArray(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  ngOnInit(): void {
    this.isHost = this.store.selectSnapshot(HostState.hostId) === this.store.selectSnapshot(AuthState.userId);

    // Subscribe to changes in shuffled text
    this.firestore.collection('game')
      .doc(this.store.selectSnapshot(HostState.hostId))
      .collection<any>('shuffledStories')
      .valueChanges()
      .subscribe((values) => {
        const resultingElement = values.find(element => {
          return element.id === this.store.selectSnapshot(AuthState.userId);
        });
        this.shuffledText = resultingElement.story;
      });

    // Send shuffled text to there
    if (this.isHost) {
      console.log('initialStories1');
      this.firestore.collection('game')
        .doc(this.store.selectSnapshot(HostState.hostId))
        .collection<any>('initialStories')
        .get()
        .subscribe(stories => {
          // Get strings and ids as arrays
          // Shuffle them
          // Create a new firebase collection shuffledStories and push the shuffled ones there.
          // Then subscribe to the changes in that storage and create a state for the user's shown text
          // Then subscribe to the state and get the text to draw.
          const storyArray = [];
          const userIdArray = [];
          stories.docs.forEach(doc => {
            console.log(doc);
            console.log(doc.data());
            console.log(doc.data().story);
            storyArray.push(doc.data().story);
            userIdArray.push(doc.data().id);
          });
          this.shuffleArray(storyArray);
          userIdArray.forEach((element, index) => {
            this.firestore.collection('game')
              .doc(this.store.selectSnapshot(HostState.hostId))
              .collection<any>('shuffledStories')
              .doc(element)
              .set({story: storyArray[index], id: element});
          });
        });
    }
  }
}
