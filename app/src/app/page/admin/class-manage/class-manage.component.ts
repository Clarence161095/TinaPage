import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/common/api.service';

@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.css'],
})
export class ClassManageComponent implements OnInit {
  classObject: any;
  students: any;
  title = 'Tina';
  cardStatus = 0;

  constructor(private api: ApiService, public router: Router, public route: ActivatedRoute) {
    if (localStorage.getItem('cardStatus')) {
      this.cardStatus = Number(localStorage.getItem('cardStatus'));
    } else {
      localStorage.setItem('cardStatus', this.cardStatus + '');
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getClass(params['classId']);
      this.getStudents(params['classId']);
      if (localStorage.getItem('cardStatus')) {
        this.cardStatus = Number(localStorage.getItem('cardStatus'));
      } else {
        localStorage.setItem('cardStatus', this.cardStatus + '');
      }
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
    });
  }

  createData() {
    this.api.createData(this.students);
  }

  setTab(status: any) {
    this.cardStatus = status;
    localStorage.setItem('cardStatus', this.cardStatus + '');
  }
}
