import { Ilots } from './../modeles/ilots';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class IlotService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Ilots[]> {
    return this.http
      .get<Ilots[]>('http://localhost:8080/api/ilots');
  }

  getOne(id: number): Observable<Ilots> {
    return this.http
      .get<Ilots>('http://localhost:8080/api/ilot/' + id);
  }
  update(item: Ilots): Observable<Ilots> {
    return this.http
      .put<Ilots>('http://localhost:8080/api/ilot/' + item.id, item);
  }

  create(item: Ilots): Observable<Ilots> {
    return this.http
      .post<Ilots>('http://localhost:8080/api/ilot/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/ilot/' + id);
  }
}
