import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownDirective } from './dropdown.directive';

@Component({
  template: `
    <div class="dropdown" dropdown>
      <button class="btn btn-secondary dropdown-toggle" type="button">
        Welcome User
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
        <li><a class="dropdown-item" href="#" (click)="logout()">Logout</a></li>
      </ul>
    </div>
  `,
})
class TestComponent {}

describe('DropdownDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let dropdownEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    dropdownEl = fixture.debugElement.query(By.directive(DropdownDirective));
  });

  it('should create an instance', () => {
    const directive = dropdownEl.injector.get(DropdownDirective);
    expect(directive).toBeTruthy();
  });

  it('should toggle the dropdown menu when the host element is clicked', () => {
    const buttonEl = dropdownEl.query(By.css('.dropdown-toggle')).nativeElement;
    const dropdownMenuEl = dropdownEl.query(
      By.css('.dropdown-menu')
    ).nativeElement;

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownMenuEl.classList).toContain('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownMenuEl.classList).not.toContain('show');
  });
});
