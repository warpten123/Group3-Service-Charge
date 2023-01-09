import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySlipComponent } from './verify-slip.component';

describe('VerifySlipComponent', () => {
  let component: VerifySlipComponent;
  let fixture: ComponentFixture<VerifySlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
