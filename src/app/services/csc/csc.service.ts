import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaticSymbolResolver } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class CscService {


  constructor(private httpservice: HttpClient) { }

  get() {
    return this.httpservice.get("assets/database/map.json");
  }

  //The intent of getStates() function is to return the 
  //states in the database but there is a problem
  //I can't use the following method as of lazy evaluation or 
  //some sort of reason I have to dig deeper and understand 
  //whether its the same as javascript promise and callback feature

  // getStates(){
  //   let states : any[] = [];
  //   this.httpservice.get("assets/database/map.json").subscribe( (resp : any) => {
  //       console.log(resp.data);
  //       resp.data.array.forEach(element => {
  //         states.push(element.state);
  //       });

  //   },(error)=>{
  //     console.log(error);
  //   });
  //   return states;
  //   let states ;
  //   this.get().subscribe
  //   ((resp : any)=>{
  //     states = resp.map[0].map(obj => obj.state);
  //     console.log(states);
  //     return states;  
  //   }, (error)=>{
  //     console.log(error);
  //   });
  //   console.log(states); 
  //   return states;
  // }

}
