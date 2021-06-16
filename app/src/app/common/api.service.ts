import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API = 'http://localhost:4300';

  constructor(private httpClient: HttpClient) {}

  getClasses() {
    return this.httpClient.get(this.API + '/classes');
  }

  getClassById(classID: any) {
    return this.httpClient.get(this.API + '/classes/' + classID);
  }

  getStudents(classID: any) {
    return this.httpClient.get(this.API + '/students?classId=' + classID);
  }
}
