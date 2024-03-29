import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from 'jwt-decode'; // Import jwt_decode library

@Component({
  selector: 'app-addevaluation',
  templateUrl: './addevaluation.component.html',
  styleUrls: ['./addevaluation.component.css']
})
export class AddevaluationComponent implements OnInit {

  evaluationform!: FormGroup;
  studentId: any | null;
  courses: any[] = [];
  teacherId: any; // Variable to store teacher ID

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService,
    private uService: UserService,
    private cService: courseService,
  ) { }

  ngOnInit(): void {
    // Initialize the form group
    this.evaluationform = this.formBuilder.group({
      note: [''], // Initialize note field
      evaluation: [''],
      courseId: ['']
    });

    // Extract student ID from the route parameters
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.studentId) {
      console.error("Student ID not found");
      return;
    }

    // Retrieve teacher ID from token
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.teacherId = decodedToken.id;
    } else {
      console.error("Token not found");
      return;
    }

    // Load courses for the specific student
    this.cService.getCourseByStudentId(this.studentId).subscribe((response: any) => {
      const studentCourses: any[] = response.courses;
      studentCourses.forEach((course: any) => {
        console.log("Course:", course);
        this.courses.push(course); // Assuming the course object contains necessary data
      });
    });
  }

  addEvaluation() {
    if (!this.studentId) {
      console.error("Student ID not found");
      return;
    }
  
    const evaluationData = this.evaluationform.value;
    const selectedCourseId = evaluationData.courseId;
    const selectedCourse = this.courses.find(course => course._id === selectedCourseId);
  
    if (!selectedCourse) {
      console.error("Selected course not found");
      return;
    }
  
    // Include teacherID in the evaluation
    const evaluation = {
      note: evaluationData.note,
      evaluation: evaluationData.evaluation,
      studentID: this.studentId,
      courseID: selectedCourseId,
      teacherID: this.teacherId
    };
  
    // Call the feedback service to add the evaluation
    this.feedbackService.addEvaluation(evaluation).subscribe((data) => {
      if (data.msg === "Evaluation Added With Success") {
        alert("Evaluation added successfully");
        // Reset the form after successful submission
        this.evaluationform.reset();
      } else {
        alert("Failed to add evaluation");
      }
    });
  }
  selectCourse(event: Event) {
    const courseId = (event.target as HTMLSelectElement).value;
    console.log('Selected Course ID:', courseId);
    const selectedCourse = this.courses.find(course => course._id === courseId);
    console.log('Selected Course:', selectedCourse);

    // Set the selected course ID in the form control
    this.evaluationform.patchValue({
      courseId: courseId
    });
  }
}

