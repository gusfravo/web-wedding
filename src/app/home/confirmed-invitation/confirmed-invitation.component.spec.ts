import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedInvitationComponent } from './confirmed-invitation.component';

describe('ConfirmedInvitationComponent', () => {
  let component: ConfirmedInvitationComponent;
  let fixture: ComponentFixture<ConfirmedInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
