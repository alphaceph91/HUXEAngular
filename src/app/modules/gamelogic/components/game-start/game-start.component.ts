import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {
  constructor(private router: Router) {}

  ufo: AnimationOptions = {
    path: '/assets/Animations/UFO/61191-ufos.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '700px',
    marginLeft: '15%',
  };

  next(): void {
    this.router.navigate(['/draw']);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {}
}
