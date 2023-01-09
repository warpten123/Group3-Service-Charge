import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSlipComponent } from './confirm-slip.component';

describe('ConfirmSlipComponent', () => {
  let component: ConfirmSlipComponent;
  let fixture: ComponentFixture<ConfirmSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
