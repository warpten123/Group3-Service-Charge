import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMonthlyComponent } from './admin-monthly.component';

describe('AdminMonthlyComponent', () => {
  let component: AdminMonthlyComponent;
  let fixture: ComponentFixture<AdminMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMonthlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
