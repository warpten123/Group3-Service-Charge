import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAgingComponent } from './client-aging.component';

describe('ClientAgingComponent', () => {
  let component: ClientAgingComponent;
  let fixture: ComponentFixture<ClientAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
