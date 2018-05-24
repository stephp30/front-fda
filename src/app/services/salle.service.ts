import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Salles } from '../modeles/salle';

@Injectable()
export class SalleService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Salles[]> {
    return this.http
      .get<Salles[]>('http://localhost:8080/api/salles');
  }

  getOne(id: number): Observable<Salles> {
    return this.http
      .get<Salles>('http://localhost:8080/api/salle/' + id);
  }
  update(item: Salles): Observable<Salles> {
    return this.http
      .put<Salles>('http://localhost:8080/api/salle/' + item.id, item);
  }

  create(item: Salles): Observable<Salles> {
    return this.http
      .post<Salles>('http://localhost:8080/api/salle/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/salle/' + id);
  }
}
