import { Formations } from './../modeles/formation';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormationService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Formations[]> {
    return this.http
      .get<Formations[]>('http://localhost:8080/api/formations');
  }

  getOne(id: number): Observable<Formations> {
    return this.http
      .get<Formations>('http://localhost:8080/api/formation/' + id);
  }
  update(item: Formations): Observable<Formations> {
    return this.http
      .put<Formations>('http://localhost:8080/api/formation/' + item.id, item);
  }

  create(item: Formations): Observable<Formations> {
    return this.http
      .post<Formations>('http://localhost:8080/api/formation/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/formation/' + id);
  }
}
