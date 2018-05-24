import { Formateurs } from './../modeles/formateurs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FormateurService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Formateurs[]> {
    return this.http
      .get<Formateurs[]>('http://localhost:8080/api/formateurs');
  }

  getOne(id: number): Observable<Formateurs> {
    return this.http
      .get<Formateurs>('http://localhost:8080/api/formateur/' + id);
  }
  update(item: Formateurs): Observable<Formateurs> {
    return this.http
      .put<Formateurs>('http://localhost:8080/api/formateur/' + item.id, item);
  }

  create(item: Formateurs): Observable<Formateurs> {
    return this.http
      .post<Formateurs>('http://localhost:8080/api/formateur/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/formateur/' + id);
  }
}
