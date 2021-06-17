import {Component, OnInit} from '@angular/core';
import common from '../../../assets/json/common.json';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

const COMMON = common;
