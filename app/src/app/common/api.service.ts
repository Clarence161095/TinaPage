import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API = 'http://localhost:4300';
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
  }

  // Class
  getClasses() {
    return this.httpClient.get(this.API + '/classes');
  }

  getClassById(classID: any) {
    return this.httpClient.get(this.API + '/classes/' + classID);
  }

  // Student
  getStudents(classID: any) {
    return this.httpClient.get(this.API + '/students?_sort=point&_order=desc&classId=' + classID);
  }

  getStudentByID(id: any) {
    return this.httpClient.get(this.API + '/students/' + id);
  }

  updateStudentPoint(student: any) {
    this.httpClient
      .patch(
        this.API + '/students/' + student.id,
        JSON.stringify({
          point: student.point,
          winStreak: student.winStreak,
          streakNumber: student.streakNumber,
        }),
        this.httpOptions
      )
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            console.log('DONE Patch effort of student: ' + student.id);
          }
        },
        (error) => {
          if (error.status == 500) {
            console.log('ERROR 500 Patch effort of student: ' + student.id);
          } else if (error.status == 404) {
            console.log('ERROR 500 Patch effort of student: ' + student.id);
          }
        }
      );
  }

  updateStudentFull(student: any) {
    this.httpClient
      .patch(
        this.API + '/students/' + Number(student.id),
        JSON.stringify({
          fullName: student.fullName,
          englishName: student.englishName,
          dob: student.dob,
          phoneNumber: student.phoneNumber,
          email: student.email,
          prinberkAccounts: student.prinberkAccounts,
          studentEmailGCH: student.studentEmailGCH,
          classId: Number(student.classId),
          point: Number(student.point),
          notes: student.notes,
        }),
        this.httpOptions
      )
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            console.log('DONE Update full info of student: ' + student.id);
          }
        },
        (error) => {
          if (error.status == 500) {
            console.log('ERROR 500 Patch effort of student: ' + student.id);
          } else if (error.status == 404) {
            console.log('ERROR 500 Patch effort of student: ' + student.id);
          }
        }
      );
  }

  addStudentFull(student: any) {
    this.httpClient
      .post(
        this.API + '/students',
        JSON.stringify({
          fullName: student.fullName,
          englishName: student.englishName,
          dob: student.dob,
          phoneNumber: student.phoneNumber,
          email: student.email,
          prinberkAccounts: student.prinberkAccounts,
          studentEmailGCH: student.studentEmailGCH,
          classId: Number(student.classId),
          point: 0,
          winStreak: 0,
          streakNumber: 0,
          notes: student.notes,
        }),
        this.httpOptions
      )
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            console.log('DONE Add student: ' + student.id);
          }
        },
        (error) => {
          if (error.status == 500) {
            console.log('ERROR 500 Add student: ' + student.id);
          } else if (error.status == 404) {
            console.log('ERROR 500 Add student: ' + student.id);
          }
        }
      );
  }

  searchStudents(keySearch: any, classId: any) {
    return this.httpClient.get(this.API + '/students?q=' + keySearch + '&classId=' + classId);
  }

  deleteStudent(student: any) {
    this.httpClient.delete(this.API + '/students/' + Number(student.id)).subscribe(
      (res: any) => {
        if (res.status == 200) {
          console.log('DONE Delete student: ' + student.id);
        }
      },
      (error) => {
        if (error.status == 500) {
          console.log('ERROR 500 Delete student: ' + student.id);
        } else if (error.status == 404) {
          console.log('ERROR 500 Delete student: ' + student.id);
        }
      }
    );
  }

  // Test
  createData(students: any) {
    // var list = ['Will', 'Lisa B', 'Violet', 'Sophia', 'Matt', 'Lucas'];
    // list.forEach((name: any) => {
    //   this.httpClient
    //     .post(
    //       this.API + '/students',
    //       JSON.stringify({
    //         fullName: name,
    //         englishName: name,
    //         dob: '2011-01-01',
    //         phoneNumber: '',
    //         email: '',
    //         prinberkAccounts: '',
    //         studentEmailGCH: '',
    //         classId: 2,
    //         point: 0,
    //         winStreak: 0,
    //         streakNumber: 0,
    //         notes: '',
    //       }),
    //       this.httpOptions
    //     )
    //     .subscribe(
    //       (res: any) => {
    //         if (res.status == 200) {
    //           console.log('Mock ok 200');
    //         }
    //       },
    //       (error) => {
    //         if (error.status == 500) {
    //           console.log('Mock fail 500');
    //         } else if (error.status == 404) {
    //           console.log('Mock fail 400');
    //         }
    //       }
    //     );
    // });
  }
}
