import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuestUpdateComponent } from './admin-guest-update.component';

describe('AdminGuestUpdateComponent', () => {
  let component: AdminGuestUpdateComponent;
  let fixture: ComponentFixture<AdminGuestUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGuestUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
