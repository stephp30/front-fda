import { Agents } from './../modeles/agents';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgentService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Agents[]> {
    return this.http
      .get<Agents[]>('http://localhost:8080/api/agents');
  }

  getOne(id: number): Observable<Agents> {
    return this.http
      .get<Agents>('http://localhost:8080/api/agent/' + id);
  }
  update(item: Agents): Observable<Agents> {
    return this.http
      .put<Agents>('http://localhost:8080/api/agent/' + item.id, item);
  }

  create(item: Agents): Observable<Agents> {
    return this.http
      .post<Agents>('http://localhost:8080/api/agent/', item);
  }

  delete(id: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/agent/' + id);
  }

}
