import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventURL:string="http://localhost:3000/abcdefgh";
  //httpClient:Livreur
    constructor(private httpClient:HttpClient) { }
  //return eventes array from BE
  //Req 1
  getAllEvents(){
  return this.httpClient.get(this.eventURL)
  
  
  }
  //Req 2 
  //return one Object
  getEventById(id:number){
    
    return this.httpClient.get( `${this.eventURL}/${id}`)
    //Return this.httpClient.get(this.eventURL + "/" + id);
  
  
  }
  //Req3
  // Return msg(String)Response (boolean)
  deleteEventById(id:number){
    return this.httpClient.delete(`${this.eventURL}/${id}`);
  }
  //return msg (string)
  addEvent(m:any){
  return this.httpClient.post(this.eventURL,m)
  
  }
  editEvent(newevent:any){
    return this.httpClient.put(this.eventURL,newevent);
  
  }}
