import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  baseUrl = environment.BaseUrl;
  constructor(private httpclient: HttpClient) { }

  Get(url): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + url, this.options);
  }

  Post(url, data): Observable<any> {
    return this.httpclient.post(this.baseUrl + url, data, this.options);
  }

  Update(id, data): Observable<any> {
    return this.httpclient.put(this.baseUrl + "/" + id, data, this.options);
  }

  Delete(id): Observable<any> {
    return this.httpclient.delete(this.baseUrl + "/" + id);
  }
}
