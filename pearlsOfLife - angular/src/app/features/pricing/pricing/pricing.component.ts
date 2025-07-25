import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  constructor(private router: Router) {}
  getPlanColor(planName: string): string {
    switch (planName) {
      case 'Auto-Obituary':
        return '#FFA500'; // Orange
      case 'Advanced Auto-Obituary':
        return '#32CD32'; // Lime Green
      case 'Legacy Creation':
        return '#9370DB'; // Medium Purple
      case 'Ultimate Legacy Creation':
        return '#FF6347'; // Tomato
      default:
        return '#4CAF50'; // Default Green
    }
  }
  scrollToTop() {
    this.router.navigate(['/auth/login']);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
