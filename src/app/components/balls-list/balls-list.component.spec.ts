import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallsListComponent } from './balls-list.component';

describe('ListComponent', () => {
  let component: BallsListComponent;
  let fixture: ComponentFixture<BallsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
