import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-true-false-icon',
  templateUrl: './true-false-icon.component.html',
  styleUrls: ['./true-false-icon.component.scss']
})
export class TrueFalseIconComponent implements OnInit {

  constructor() { }
  @Input() evaluatedValue: boolean;

  ngOnInit() {
  }

}
