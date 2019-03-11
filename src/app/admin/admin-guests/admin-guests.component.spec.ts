import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuestsComponent } from './admin-guests.component';

describe('AdminGuestsComponent', () => {
  let component: AdminGuestsComponent;
  let fixture: ComponentFixture<AdminGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
