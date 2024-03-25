import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  evalUrl: string = "http://localhost:3000/evaluations";

  constructor(private http:HttpClient) { }
  addEvaluation(evaluationData: any){
    return this.http.post<{msg:any}>(this.evalUrl,evaluationData);
  }
}
