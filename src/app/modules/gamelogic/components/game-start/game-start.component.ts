import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/draw']);
  }

  ngOnInit(): void {}
}
