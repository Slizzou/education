import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-addevaluation',
  templateUrl: './addevaluation.component.html',
  styleUrls: ['./addevaluation.component.css']
})
export class AddevaluationComponent implements OnInit {

  evaluationform!: FormGroup;
  studentId: any | null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.evaluationform = this.formBuilder.group({
      note: [''],
      evaluation: ['']
    });

    // Extract student ID from the route parameters
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  addEvaluation() {
    if (!this.studentId) {
      console.error("Student ID not found");
      return;
    }

    const evaluationData = this.evaluationform.value;

    const evaluation = {
      note: evaluationData.note,
      evaluation: evaluationData.evaluation,
      studentID: this.studentId // Add student ID obtained from the path
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
}



/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit {
  
*/