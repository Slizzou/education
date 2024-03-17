import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherURL:string="http://localhost:3000/abcde";
  //httpClient:Livreur
    constructor(private httpClient:HttpClient) { }
  //return teacheres array from BE
  //Req 1
  getAllTeachers(){
  return this.httpClient.get(this.teacherURL)
  
  
  }
  //Req 2 
  //return one Object
  getTeacherById(id:number){
    
    return this.httpClient.get( `${this.teacherURL}/${id}`)
    //Return this.httpClient.get(this.teacherURL + "/" + id);
  
  
  }
  //Req3
  // Return msg(String)Response (boolean)
  deleteTeacherById(id:number){
    return this.httpClient.delete(`${this.teacherURL}/${id}`);
  }
  //return msg (string)
  addTeacher(m:any){
  return this.httpClient.post(this.teacherURL,m)
  
  }
  editTeacher(newteacher:any){
    return this.httpClient.put(this.teacherURL,newteacher);
  
  }

}
