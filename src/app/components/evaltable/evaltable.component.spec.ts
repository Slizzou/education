import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaltableComponent } from './evaltable.component';

describe('EvaltableComponent', () => {
  let component: EvaltableComponent;
  let fixture: ComponentFixture<EvaltableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaltableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
