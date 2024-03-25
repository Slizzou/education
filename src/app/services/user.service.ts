import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users";
  teachersUrl:string="http://localhost:3000/getallteachers";
  parentsUrl:string="http://localhost:3000/getallparents";
  studentsUrl:string="http://localhost:3000/getallstudents";
  teacherUrl:string="http://localhost:3000/teachers";




  constructor(private http: HttpClient) { }

  //User={firstName:....,lastName:...,email:....,pwd:....}
  signup(user: any, avatar: File, cv: File) {
    const formData = new FormData();
    
    // Append avatar file if provided
    if (avatar) {
      formData.append("img", avatar);
    }
  
    // Append CV file if provided
    if (cv) {
      formData.append("cv", cv);
    }
  
    // Append user data
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
  
    // Send POST request with FormData containing user data and files
    return this.http.post<{ msg: string }>(this.userUrl + '/signup', formData);
  }
  
  login(user: any) {
    return this.http.post<{ msg: string, token: string }>(this.userUrl + '/login', user);


  }

  getAllTeachers() {
    return this.http.get<{ teachers: any }>(this.teachersUrl)
  
  
  }
  getAllUsers() {
    return this.http.get<{ users: any }>(this.userUrl)
  
  
  }
  getAllStudents() {
    return this.http.get<{ students: any }>(this.studentsUrl)
  
  
  }
  getAllParents() {
    return this.http.get<{ parents: any }>(this.parentsUrl)
  
  
  }
  deleteUserById(id: number) {
    return this.http.delete<{ users: any , response: string }>(`${this.userUrl}/${id}`);
  }
  //return msg (string)
  addUser(m: any) {
    return this.http.post<{ isAdded: any }>(this.userUrl, m)

  }
  editUser(newUser: any) {

    return this.http.put<{response: any }>(this.userUrl, newUser);

  }
  validateTeacher(newTeacher: any) {

    return this.http.put<{response: any }>(this.teacherUrl, newTeacher);

  }
  getUserById(id: any) {

    return this.http.get<{ obj: any ,msg:any}>(`${this.userUrl}/${id}`)
    //Return this.httpClient.get(this.matchURL + "/" + id);


  }
  getStudentsByTeacherId(teacherId: any) {
    return this.http.get<{ students: any }>(`${this.userUrl}/teacher/${teacherId}`);
  }
  

  updateStudentCourseId(studentId: any, courseId: any) {
    return this.http.put<{ obj: any, msg: any }>(`${this.userUrl}/${studentId}/course`, { courseId });
  }
}


//user={email:.....,pwd:....}

