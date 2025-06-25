import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss'],
})
export class LegacyComponent {
  constructor(private readonly router: Router) {}

  goToPage() {
    // Check for authentication token (adjust key as needed)
    const token = localStorage.getItem('accessToken');
    if (token) {
      debugger;
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
