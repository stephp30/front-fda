import { Flux } from './../modeles/flux';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FluxService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Flux[]> {
    return this.http
      .get<Flux[]>('http://localhost:8080/api/flux');
  }

  getOne(id: number): Observable<Flux> {
    return this.http
      .get<Flux>('http://localhost:8080/api/flux/' + id);
  }
  update(item: Flux): Observable<Flux> {
    return this.http
      .put<Flux>('http://localhost:8080/api/flux/' + item.id, item);
  }

  create(item: Flux): Observable<Flux> {
    return this.http
      .post<Flux>('http://localhost:8080/api/flux/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/flux/' + id);
  }
}
