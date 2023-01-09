import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResolvedComponent } from './client-resolved.component';

describe('ClientResolvedComponent', () => {
  let component: ClientResolvedComponent;
  let fixture: ComponentFixture<ClientResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientResolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
