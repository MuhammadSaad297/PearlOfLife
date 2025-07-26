import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { Router, RouterModule } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';

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
    private readonly router: Router,
    private soundService: SoundService
  ) {}

  @Input() activeItem: string;

  logout() {
    this.soundService.playClickSound();
    this.sharedService.logout();
  }

  openPersonalInfo() {
    this.soundService.playClickSound();
    this.router.navigate(['/personal-info']);
  }
  openPasswords() {
    this.router.navigate(['/passwords']);
  }

  openForgotPassword() {
    this.soundService.playClickSound();
    this.router.navigate(['/auth/forget-password']);
  }
}
