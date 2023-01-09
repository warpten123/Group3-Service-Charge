import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamNavbarComponent } from './sales-team-navbar.component';

describe('SalesTeamNavbarComponent', () => {
  let component: SalesTeamNavbarComponent;
  let fixture: ComponentFixture<SalesTeamNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTeamNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTeamNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
