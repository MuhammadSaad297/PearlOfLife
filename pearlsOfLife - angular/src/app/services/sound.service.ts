// sound.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private clickSound = new Audio();

  constructor() {
    this.clickSound.src = 'assets/sound.mp3';
    this.clickSound.load();
  }

  playClickSound() {
    this.clickSound.currentTime = 0; // Rewind to start
    this.clickSound.play();
  }
}
