import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/common/api.service';
import common from '../../../assets/json/common.json';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  classObject: any;
  students: any;
  title = 'Tina';

  constructor(
    private api: ApiService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getClass(params['classId']);
      this.getStudents(params['classId']);
    });
  }

  getClass(classId: any) {
    this.api.getClassById(classId).subscribe((response) => {
      this.classObject = response;
      this.title = this.classObject.name;
    });
  }

  getStudents(classID: any) {
    this.api.getStudents(classID).subscribe((response) => {
      this.students = response;      
    })
  }
}

const COMMON = common;
