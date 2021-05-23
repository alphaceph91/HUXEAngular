import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  playerNumber = ['4', '6', '8', '10'];
  num = 4;
  flipval = false;
  flipval2 = false;
  flipval3 = false;

  changeNumber(e): void {
    console.log(e.target.value);
    if (e.target.value.slice(0, 1).includes('1') === true) {
      this.num = parseInt(e.target.value.slice(0, 2), 10);
    } else {
      this.num = parseInt(e.target.value.slice(0, 1), 10);
    }
  }

  flip(): void {
    this.flipval = !this.flipval;
    this.flipval2 = false;
    this.flipval3 = false;
  }

  flip2(): void {
    this.flipval2 = !this.flipval2;
    this.flipval3 = false;
    this.flipval = false;
  }

  flip3(): void {
    this.flipval3 = !this.flipval3;
    this.flipval2 = false;
    this.flipval = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
