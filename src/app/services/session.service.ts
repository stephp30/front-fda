import { Sessions } from './../modeles/sessions';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Sessions[]> {
    return this.http
      .get<Sessions[]>('http://localhost:8080/api/sessions');
  }

  getValide(): Observable<Sessions[]> {
    return this.http
      .get<Sessions[]>('http://localhost:8080/api/sessionsValides');
  }

  getOne(id: number): Observable<Sessions> {
    return this.http
      .get<Sessions>('http://localhost:8080/api/session/' + id);
  }
  update(item: Sessions): Observable<Sessions> {
    return this.http
      .put<Sessions>('http://localhost:8080/api/session/' + item.id, item);
  }

  create(item: Sessions): Observable<Sessions> {
    return this.http
      .post<Sessions>('http://localhost:8080/api/session/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/session/' + id);
  }

  convocation(item: Sessions): Observable<Sessions> {
    return this.http
      .post<Sessions>('http://localhost:8080/api/convocations/', item);
  }

  emargement(item: Sessions): Observable<Sessions> {
    return this.http
      .post<Sessions>('http://localhost:8080/api/emargement/', item);
  }
}
