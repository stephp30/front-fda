import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Salles } from '../modeles/salle';

@Injectable()
export class SalleService {

  API: String = 'http://localhost:8080/api/';
  items: String = 'salles';
  item: String = 'salle/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Salles[]> {
    return this.http
      .get<Salles[]>(this.API + '' + this.items);
  }

  getOne(id: number): Observable<Salles> {
    return this.http
      .get<Salles>(this.API + '' + this.item + '' + id);
  }
  update(item: Salles): Observable<Salles> {
    return this.http
      .put<Salles>(this.API + '' + this.item + item.id, item);
  }

  create(item: Salles): Observable<Salles> {
    return this.http
      .post<Salles>(this.API + '' + this.item, item);
  }

  delete(id: number) {
    return this.http
      .delete<any>(this.API + '' + this.item + id);
  }
}
