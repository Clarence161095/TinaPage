import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import common from '../../../assets/json/common.json';
import data from '../../../assets/json/data.json';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  homeImage = COMMON.home.homeImage;
  classes: any;
  active: any;

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getClasses()
  }

  getClasses(){
    this.api.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
  }
}

const COMMON = common;
const DATA = data;
