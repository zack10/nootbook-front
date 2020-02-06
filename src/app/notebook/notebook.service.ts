import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CodeModal} from './modals/codeModal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  private url = 'http://localhost:8080/oracle/notebook/execute';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  execute(code: CodeModal): Observable<any> {
    return this.http.post(this.url, code, this.httpOptions);
  }
}
