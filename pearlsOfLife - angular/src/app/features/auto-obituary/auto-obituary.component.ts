// src/app/pages/auto-obituary/auto-obituary.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from '../../components/hero/hero.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { fadeInOnScroll } from '../../services/animations';

@Component({
  selector: 'app-auto-obituary',
  // standalone: true,
  // imports: [CommonModule, FormsModule, HeroComponent, ButtonComponent, CtaComponent],
  templateUrl: './auto-obituary.component.html',
  styleUrls: ['./auto-obituary.component.scss'],
  // animations: [fadeInOnScroll],
})
export class AutoObituaryComponent implements OnInit {
  ngOnInit() {
    this.initScrollAnimation();
  }

  private initScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document
        .querySelectorAll('.card-section, .plan-section, .upgrade-section')
        .forEach((section) => observer.observe(section));
    }, 100);
  }
}
