import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parenteval',
  templateUrl: './parenteval.component.html',
  styleUrls: ['./parenteval.component.css']
})
export class ParentevalComponent implements OnInit {

  evaluations: any[] = [];

  constructor(private feedbackService: FeedbackService, private userService: UserService) { }

  ngOnInit(): void {
    // Extract phone number from the parent's token
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      const phoneNumber = decodedToken.phoneNumber; // Assuming 'phoneNumber' is present in the token payload
      if (phoneNumber) {
        // Call UserService to get user by phone number
        this.userService.getUserByPhoneNumber(phoneNumber).subscribe((response: any) => {
          console.log("User Info:", response.obj);
          const studentId = response.obj?._id
          ; // Assuming 'studentId' is present in the response object
          if (studentId) {
            // Call feedback service to get evaluations by student ID
            this.feedbackService.getEvaluationsByStudentId(studentId).subscribe((evalResponse: any) => {
              console.log("Student's Evaluations:", evalResponse.evaluations);
              this.evaluations = evalResponse.evaluations;
            });
          } else {
            console.error("Student ID not found in the user object");
          }
        });
      } else {
        console.error("Phone number not found in the token");
      }
    } else {
      console.error("Token not found");
    }
  }
}



