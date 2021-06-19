import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/common/api.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  @ViewChild("fullName", { static: false }) fullName: any;
  @ViewChild("englishName", { static: false }) englishName: any;
  @ViewChild("dob", { static: false }) dob: any;
  @ViewChild("phoneNumber", { static: false }) phoneNumber: any;
  @ViewChild("email", { static: false }) email: any;
  @ViewChild("prinberkAccounts", { static: false }) prinberkAccounts: any;
  @ViewChild("studentEmailGCH", { static: false }) studentEmailGCH: any;
  @ViewChild("classId", { static: false }) classId: any;
  @ViewChild("point", { static: false }) point: any;
  @ViewChild("notes", { static: false }) notes: any;
  @ViewChild("fullNameNew", { static: false }) fullNameNew: any;
  @ViewChild("englishNameNew", { static: false }) englishNameNew: any;
  @ViewChild("dobNew", { static: false }) dobNew: any;
  @ViewChild("phoneNumberNew", { static: false }) phoneNumberNew: any;
  @ViewChild("emailNew", { static: false }) emailNew: any;
  @ViewChild("prinberkAccountsNew", { static: false }) prinberkAccountsNew: any;
  @ViewChild("studentEmailGCHNew", { static: false }) studentEmailGCHNew: any;
  @ViewChild("classIdNew", { static: false }) classIdNew: any;
  @ViewChild("pointNew", { static: false }) pointNew: any;
  @ViewChild("notesNew", { static: false }) notesNew: any;
  @ViewChild("keySearch", { static: false }) keySearch: any;

  classObject: any;
  students: any;
  rmStudentID = 0;
  rmStudentName = "";
  title = "Tina";
  end = 0;
  luck = 0;
  studentSelected: any = {
    id: 22,
    fullName: "",
    englishName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    prinberkAccounts: "",
    studentEmailGCH: "",
    classId: 1,
    point: 0,
    winStreak: 0,
    streakNumber: 0,
    notes: "",
  };
  classes: any = [
    {
      id: 1,
      name: "Class 4A",
      year: "2021",
    },
    {
      id: 2,
      name: "Class 3B",
      year: "2021",
      numbers: "32",
    },
    {
      id: 3,
      name: "Class 3C",
      year: "2021",
    },
  ];

  constructor(private api: ApiService, public router: Router, public route: ActivatedRoute) {
    this.resetPage();
  }

  ngOnInit(): void {
    this.resetPage();
  }

  resetPage() {
    this.route.params.subscribe((params) => {
      this.getClass(params["classId"]);
      this.getStudents(params["classId"]);
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

  searchStudents(keySearch: any) {
    this.api.searchStudents(keySearch, this.classObject.id).subscribe((response) => {
      this.students = response;
    });
  }

  showStudent(student: any) {
    this.studentSelected = student;
  }

  handleDelete(student: any) {
    if (confirm("Do you want to dele " + student.englishName + " new student?")) {
      this.api.deleteStudent(student);
      this.getStudents(this.classObject.id);
    }
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
      if (confirm("Do you want to save your changes?")) {
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
        this.resetPage();
      }
    }
  }

  resetStudent() {
    this.fullNameNew.nativeElement.value = "";
    this.englishNameNew.nativeElement.value = "";
    this.phoneNumberNew.nativeElement.value = "";
    this.dobNew.nativeElement.value = "2011-01-01";
    this.emailNew.nativeElement.value = "";
    this.prinberkAccountsNew.nativeElement.value = "";
    this.studentEmailGCHNew.nativeElement.value = "";
    this.classIdNew.nativeElement.value = this.classObject.id;
    this.pointNew.nativeElement.value = 0;
    this.notesNew.nativeElement.value = "";
  }

  newStudent() {
    if (this.fullNameNew.nativeElement.value != "" && this.englishNameNew.nativeElement.value != "") {
      if (confirm("Do you want to add a new student?")) {
        this.api.addStudentFull({
          fullName: this.fullNameNew.nativeElement.value,
          englishName: this.englishNameNew.nativeElement.value,
          dob: this.dobNew.nativeElement.value,
          phoneNumber: this.phoneNumberNew.nativeElement.value,
          email: this.emailNew.nativeElement.value,
          prinberkAccounts: this.prinberkAccountsNew.nativeElement.value,
          studentEmailGCH: this.studentEmailGCHNew.nativeElement.value,
          classId: this.classIdNew.nativeElement.value,
          point: this.pointNew.nativeElement.value,
          notes: this.notesNew.nativeElement.value,
        });
        this.resetPage();
      }
    }
    this.resetPage();
  }

  onKeySearch(event: any) {
    if (event.target.value != "") {
      this.searchStudents(event.target.value);
    }
  }

  getIndex(index: any): string {
    let newIndex = Number(index) + 1;
    if (newIndex < 10) {
      return "0" + newIndex;
    } else {
      return newIndex + "";
    }
  }
}
