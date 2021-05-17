import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CscService {

   
  constructor(private httpservice : HttpClient) { }

  getStates(){
   
  }

}
