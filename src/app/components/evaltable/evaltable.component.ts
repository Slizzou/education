import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import {jwtDecode} from 'jwt-decode'; // Import jwt_decode library

@Component({
  selector: 'app-evaltable',
  templateUrl: './evaltable.component.html',
  styleUrls: ['./evaltable.component.css']
})
export class EvaltableComponent implements OnInit {
  evaluations: any[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    // Extract teacherID from the token
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log("this is ",decodedToken)
      const teacherId = decodedToken.id; // Assuming 'teacherID' is present in the token payload
      if (teacherId) {
        this.feedbackService.getEvaluationsByTeacherId(teacherId).subscribe((response: any) => {
          console.log("Those are my evals",response.evaluations)
          this.evaluations = response.evaluations;
        });
      } else {
        console.error("Teacher ID not found in the token");
      }
    } else {
      console.error("Token not found");
    }
  }
}
