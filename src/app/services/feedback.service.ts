import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private evalUrl: string = "http://localhost:3000/evaluations";

  constructor(private http: HttpClient) { }

  addEvaluation(evaluationData: any) {
    return this.http.post<{ msg: any }>(this.evalUrl, evaluationData);
  }

  getEvalById(id: any) {
    return this.http.get<{ obj: any, msg: any }>(`${this.evalUrl}/${id}`);
  }

  getEvaluationsByStudentId(studentId: any) {
    return this.http.get<{ evaluations: any[], msg: any }>(`http://localhost:3000/evaluations/student/${studentId}`);
  }

  getEvaluationsByTeacherId(teacherId: any) {
    return this.http.get<{ evaluations: any[], msg: any }>(`http://localhost:3000/evaluations/teacher/${teacherId}`);
  }
}
