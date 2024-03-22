import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddevaluationComponent } from './addevaluation.component';

describe('AddevaluationComponent', () => {
  let component: AddevaluationComponent;
  let fixture: ComponentFixture<AddevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddevaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
