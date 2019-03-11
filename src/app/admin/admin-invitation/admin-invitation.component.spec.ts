import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvitationComponent } from './admin-invitation.component';

describe('AdminInvitationComponent', () => {
  let component: AdminInvitationComponent;
  let fixture: ComponentFixture<AdminInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
