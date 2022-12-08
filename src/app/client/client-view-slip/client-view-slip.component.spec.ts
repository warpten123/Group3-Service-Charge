import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewSlipComponent } from './client-view-slip.component';

describe('ClientViewSlipComponent', () => {
  let component: ClientViewSlipComponent;
  let fixture: ComponentFixture<ClientViewSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewSlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientViewSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
