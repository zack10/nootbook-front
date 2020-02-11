import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CodeModal} from './modals/codeModal';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  private url = environment.url;  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  execute(code: CodeModal): Observable<any> {
    return this.http.post(this.url + 'execute', code, this.httpOptions);
  }
}
