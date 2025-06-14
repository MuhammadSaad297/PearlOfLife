import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private readonly sharedService: SharedService,
    private readonly router: Router
  ) {}

  @Input() activeItem: string;

  logout() {
    this.sharedService.logout();
  }

  openPersonalInfo() {
    this.router.navigate(['/personal-info']);
  }
  openPasswords() {
    this.router.navigate(['/passwords']);
  }

  openForgotPassword() {
    this.router.navigate(['/auth/forget-password']);
  }
}
