import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  num = 4;

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/describe']);
  }

  ngOnInit(): void {}
}
