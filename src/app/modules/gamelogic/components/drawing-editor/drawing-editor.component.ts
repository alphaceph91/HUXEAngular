import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';
declare interface Position {
  offsetX: number;
  offsetY: number;
}
@Component({
  selector: 'app-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.components.scss'],
})
export class DrawingEditorComponent implements AfterViewInit, OnDestroy {
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
  onMouseMove({ offsetX, offsetY }): void {
    if (this.currentyDrawing) {
      const offSetData = { offsetX, offsetY };
      this.position = [
        {
          start: { ...this.prevPos },
          stop: { ...offSetData },
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
    { offsetX: x, offsetY: y }: Position,
    { offsetX, offsetY }: Position
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
}
