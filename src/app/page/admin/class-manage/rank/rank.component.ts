import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from 'src/app/common/api.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
})
export class RankComponent implements OnInit {
  @ViewChild('fullName', {static: false}) fullName: any;
  @ViewChild('englishName', {static: false}) englishName: any;
  @ViewChild('dob', {static: false}) dob: any;
  @ViewChild('phoneNumber', {static: false}) phoneNumber: any;
  @ViewChild('email', {static: false}) email: any;
  @ViewChild('prinberkAccounts', {static: false}) prinberkAccounts: any;
  @ViewChild('studentEmailGCH', {static: false}) studentEmailGCH: any;
  @ViewChild('classId', {static: false}) classId: any;
  @ViewChild('point', {static: false}) point: any;
  @ViewChild('notes', {static: false}) notes: any;

  classObject: any;
  students: any;
  rmStudentID = 0;
  rmStudentName = '';
  title = 'Tina';
  end = 0;
  luck = 0;
  studentSelected: any = {
    id: 22,
    fullName: '',
    englishName: '',
    dob: '',
    phoneNumber: '',
    email: '',
    prinberkAccounts: '',
    studentEmailGCH: '',
    classId: 1,
    point: 0,
    winStreak: 0,
    streakNumber: 0,
    notes: '',
  };
  classes: any = [
    {
      id: 1,
      name: 'Class 4A',
      year: '2021',
    },
    {
      id: 2,
      name: 'Class 3B',
      year: '2021',
      numbers: '32',
    },
    {
      id: 3,
      name: 'Class 3C',
      year: '2021',
    },
  ];

  constructor(private api: ApiService, public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getClass(params['classId']);
      this.getStudents(params['classId']);
      this.getClasses();
    });
  }

  getClasses() {
    this.api.getClasses().subscribe((response) => {
      this.classes = response;
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
      this.end = 0;
      this.students.forEach((student: any, index: number) => {
        this.studentSelected = student;
        if (student.point != 0) {
          student.luck = index * 5 - 30;
          student.luckStart = this.end + 1;
          student.luckEnd = this.end + 100 + student.luck;
          this.end = student.luckEnd + 1;
          if (student.luck < 0) {
            student.luckCondition = 0;
          } else if (student.luck > 0) {
            student.luckCondition = 1;
          } else if (student.luck == 0) {
            student.luckCondition = 2;
          }
        } else {
          student.luck = 0;
          student.luckStart = this.end + 1;
          student.luckEnd = this.end + 100 + student.luck;
          this.end = student.luckEnd + 1;
          if (student.luck < 0) {
            student.luckCondition = 0;
          } else if (student.luck > 0) {
            student.luckCondition = 1;
          } else if (student.luck == 0) {
            student.luckCondition = 2;
          }
        }
      });
    });
  }

  plusPoint(point: any) {
    if (point != 0) {
      if (confirm('Are you sure to plus +' + point + ' point and next')) {
        this.api.getStudentByID(this.rmStudentID).subscribe((response) => {
          var student: any = response;
          if (point == 1) {
            //tra loi sai
            if (student.winStreak == 1) {
              student.streakNumber -= 1;
              student.point += 2;
            } else if (student.winStreak == 2) {
              student.streakNumber = 0;
              student.winStreak = 0;
              student.point += 1;
            } else if (student.winStreak == 0) {
              student.streakNumber -= 1;
              student.point += 1;
              if (student.streakNumber < -2) {
                student.winStreak = 1;
                student.point += 1;
              }
            }
          } else if (point == 2) {
            //tra loi dung
            if (student.winStreak == 2) {
              student.streakNumber += 1;
              student.point += 3;
            } else if (student.winStreak == 1) {
              student.streakNumber = 0;
              student.winStreak = 0;
              student.point += 2;
            } else if (student.winStreak == 0) {
              student.streakNumber += 1;
              student.point += 2;
              if (student.streakNumber > 2) {
                student.winStreak = 2;
                student.point += 1;
              }
            }
          }

          this.api.updateStudentPoint(student);
          this.getStudents(this.classObject.id);
        });
      }
    } else {
      this.randomStudent();
      this.getStudents(this.classObject.id);
    }
  }

  plusOne(student: any) {
    if (confirm('Are you sure to plus +1 point for ' + student.englishName)) {
      student.point += 1;
      this.api.updateStudentPoint(student);
      this.getStudents(this.classObject.id);
    }
  }

  minusOne(student: any) {
    if (confirm('Are you sure to minus -1 point for ' + student.englishName)) {
      student.point -= 1;
      this.api.updateStudentPoint(student);
      this.getStudents(this.classObject.id);
    }
  }

  randomStudent() {
    let random = Math.floor(Math.random() * this.end);
    this.students.forEach((student: any) => {
      if (random >= student.luckStart && random <= student.luckEnd) {
        this.rmStudentName = student.englishName;
        this.rmStudentID = student.id;
      }
    });
  }

  getIndex(index: any): string {
    let newIndex = Number(index) + 1;
    if (newIndex < 10) {
      return '0' + newIndex;
    } else {
      return newIndex + '';
    }
  }

  showStudent(student: any) {
    this.studentSelected = student;
  }

  updateStudent() {
    if (
      this.studentSelected.fullName != this.fullName.nativeElement.value ||
      this.studentSelected.englishName != this.englishName.nativeElement.value ||
      this.studentSelected.dob != this.dob.nativeElement.value ||
      this.studentSelected.phoneNumber != this.phoneNumber.nativeElement.value ||
      this.studentSelected.email != this.email.nativeElement.value ||
      this.studentSelected.prinberkAccounts != this.prinberkAccounts.nativeElement.value ||
      this.studentSelected.studentEmailGCH != this.studentEmailGCH.nativeElement.value ||
      this.studentSelected.classId != this.classId.nativeElement.value ||
      this.studentSelected.point != this.point.nativeElement.value ||
      this.studentSelected.notes != this.notes.nativeElement.value
    ) {
      if (confirm('Do you want to save your changes?')) {
        this.api.updateStudentFull({
          id: this.studentSelected.id,
          fullName: this.fullName.nativeElement.value,
          dob: this.dob.nativeElement.value,
          englishName: this.englishName.nativeElement.value,
          phoneNumber: this.phoneNumber.nativeElement.value,
          email: this.email.nativeElement.value,
          prinberkAccounts: this.prinberkAccounts.nativeElement.value,
          studentEmailGCH: this.studentEmailGCH.nativeElement.value,
          classId: this.classId.nativeElement.value,
          point: this.point.nativeElement.value,
          notes: this.notes.nativeElement.value,
        });
        this.getStudents(this.classObject.id);
      }
    }
  }

  //Mock data
  createData() {
    this.api.createData(this.students);
  }
}
