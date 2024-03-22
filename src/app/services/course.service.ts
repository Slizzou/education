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
    getCourseByTeacherId(teacherId: any) {
      return this.httpClient.get<{ courses: any }>(`${this.courseURL}/teacher/${teacherId}`);
    }
    //Req3
    // Return msg(String)Response (boolean)
    deleteCourseById(id:any){
      return this.httpClient.delete<{ courses: any , response: string }>(`${this.courseURL}/${id}`);
    }
    //return msg (string)
   
    editCourse(newcourse:any){
      return this.httpClient.put<{response:any}>(this.courseURL,newcourse);
    
    }
    addCourse(course: any, imgcourse: File) {
      const formData = new FormData();
      
      // Append course image file if provided
      if (imgcourse) {
        formData.append("img", imgcourse);
      }
    
      // Append course data
      formData.append("name", course.name);
      formData.append("description", course.description);
      formData.append("teacherID", course.teacherID);
      formData.append("duration", course.duration);
      formData.append("students", JSON.stringify(course.students)); // Convert students array to string
      
      // Send POST request with FormData containing course data and image
      return this.httpClient.post<{ isAdded: any }>(this.courseURL,formData);
    }
    

}
