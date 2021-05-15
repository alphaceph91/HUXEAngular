import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'create-drawing';
  base64 = '';
  saveImage(base64: string): void {
    this.base64 = base64;
  }
}
