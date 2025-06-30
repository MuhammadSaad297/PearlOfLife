import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss'],
})
export class LegacyComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  goToPage(type: string) {
    // Check for authentication token (adjust key as needed)
    const token = localStorage.getItem('accessToken');
    if (token && type === 'dashboard') {
      // Navigate to dashboard as a child route of the current route (features module)
      this.router.navigate(['/dashboard'], {
        relativeTo: this.route.parent,
      });
    } else if (type === 'login') {
      // Navigate to login page
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  goToLogin() {
    // Navigate to login page
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/auth/login']);
    }
  }
}
