import { Grades } from './../modeles/grade';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GradeService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Grades[]> {
    return this.http
      .get<Grades[]>('http://localhost:8080/api/grades');
  }

  getOne(id: number): Observable<Grades> {
    return this.http
      .get<Grades>('http://localhost:8080/api/grade/' + id);
  }
  update(item: Grades): Observable<Grades> {
    return this.http
      .put<Grades>('http://localhost:8080/api/grade/' + item.id, item);
  }

  create(item: Grades): Observable<Grades> {
    return this.http
      .post<Grades>('http://localhost:8080/api/grade/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/grade/' + id);
  }
}
