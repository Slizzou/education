import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentevalComponent } from './parenteval.component';

describe('ParentevalComponent', () => {
  let component: ParentevalComponent;
  let fixture: ComponentFixture<ParentevalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentevalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
