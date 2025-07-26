import { Component } from '@angular/core';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  constructor(private soundService: SoundService) {}
  scrollToTop() {
    this.soundService.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
