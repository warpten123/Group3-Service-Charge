import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-team-navbar',
  templateUrl: './sales-team-navbar.component.html',
  styleUrls: ['./sales-team-navbar.component.css'],
})
export class SalesTeamNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  logout() {
    console.log('clicked logout');
    this.router.navigate(['/login']);
  }
}
