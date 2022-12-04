import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamDashboardComponent } from './sales-team-dashboard.component';

describe('SalesTeamDashboardComponent', () => {
  let component: SalesTeamDashboardComponent;
  let fixture: ComponentFixture<SalesTeamDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTeamDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
