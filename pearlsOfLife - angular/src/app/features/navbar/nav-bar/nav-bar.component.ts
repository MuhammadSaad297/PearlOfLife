import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isMobileMenuOpen = false;
  constructor(private router: Router, private soundService: SoundService) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  goToPage(type: string) {
    this.soundService.playClickSound();
    this.router.navigate([`/${type}`]);
  }
}
