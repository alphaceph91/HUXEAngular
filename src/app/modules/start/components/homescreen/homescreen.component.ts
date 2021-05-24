import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
})
export class HomescreenComponent implements OnInit {
  laughs: AnimationOptions = {
    path: '/assets/Animations/Laughs/1443-laughs.json',
  };
  write: AnimationOptions = {
    path: '/assets/Animations/writing/41460-writing.json',
  };
  draw: AnimationOptions = {
    path: '/assets/Animations/Drawing/8704-drawing-with-a-graphic-tablet.json',
  };
  guess: AnimationOptions = {
    path: '/assets/Animations/Thinking/43228-thinking-animation.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  pictureid = 0;

  click = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  form: FormGroup;
  submitted = false;

  click1 = false;
  hover1 = false;

  click2 = false;
  hover2 = false;

  click3 = false;
  hover3 = false;

  click4 = false;
  hover4 = false;

  click5 = false;
  hover5 = false;

  click6 = false;
  hover6 = false;

  click7 = false;
  hover7 = false;

  click8 = false;
  hover8 = false;

  click9 = false;
  hover9 = false;

  click10 = false;
  hover10 = false;

  click11 = false;
  hover11 = false;

  click12 = false;
  hover12 = false;

  images: Array<string> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  colors: Array<string> = [
    '#36b1a7',
    '#fbae17',
    '#5f5494',
    '#fc9cc7',
    '#e83942',
    '#019678',
    '#e83942',
    '#019678',
    '#36b1a7',
    '#fbae17',
    '#5f5494',
    '#fc9cc7',
  ];
  colorshalf: Array<string> = [
    'rgba(54, 177, 167,0.5)',
    'rgba(251, 174, 23, 0.5)',
    'rgba(95, 84, 148,0.5)',
    'rgba(252, 156, 199,0.5)',
    'rgba(232, 57, 66,0.5)',
    'rgba(1, 150, 120, 0.5)',
    'rgba(54, 177, 167,0.5)',
    'rgba(251, 174, 23, 0.5)',
    'rgba(95, 84, 148,0.5)',
    'rgba(252, 156, 199,0.5)',
    'rgba(232, 57, 66,0.5)',
    'rgba(1, 150, 120, 0.5)',
  ];

  @ViewChild('avatars')
  avatars: ElementRef<HTMLDivElement> | null = null;
  @Input() src: string;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  next(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {
      this.router.navigate(['/lobby']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
