import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBallComponent } from './add-ball.component';

describe('AddBallComponent', () => {
  let component: AddBallComponent;
  let fixture: ComponentFixture<AddBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
