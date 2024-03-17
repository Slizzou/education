import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  export class courseService {
    courseURL:string="http://localhost:3000/courses";
    //httpClient:Livreur
      constructor(private httpClient:HttpClient) { }
    //return coursees array from BE
    //Req 1
    getAllcourses(){
    return this.httpClient.get<{courses:any}>(this.courseURL)
    
    
    }
    //Req 2 
    //return one Object
    getCourseById(id:any){
      //
      
      return this.httpClient.get<{ obj: any ,msg:any}>(`${this.courseURL}/${id}`);
      //Return this.httpClient.get(this.courseURL + "/" + id);
    
    
    }
    //Req3
    // Return msg(String)Response (boolean)
    deleteCourseById(id:any){
      return this.httpClient.delete<{ courses: any , response: string }>(`${this.courseURL}/${id}`);
    }
    //return msg (string)
    addCourse(m:any){
    return this.httpClient.post(this.courseURL,m)
    
    }
    editCourse(newcourse:any){
      return this.httpClient.put<{response:any}>(this.courseURL,newcourse);
    
    }
  

}
