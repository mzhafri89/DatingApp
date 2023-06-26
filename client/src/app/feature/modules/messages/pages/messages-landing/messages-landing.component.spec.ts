import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesLandingComponent } from './messages-landing.component';

describe('MessagesLandingComponent', () => {
  let component: MessagesLandingComponent;
  let fixture: ComponentFixture<MessagesLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesLandingComponent]
    });
    fixture = TestBed.createComponent(MessagesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
