// src/app/pages/legacy/legacy.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { fadeInOnScroll } from '../../services/animations';
import { ButtonComponent } from 'src/app/shared/button/button.component';

interface LegacyCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface PlanCard {
  title: string;
  price: number;
  description: string;
  features: string[];
  gradient: string;
}

@Component({
  selector: 'app-legacy-navbar',
  // standalone: true,
  // imports: [CommonModule, HeroComponent, ButtonComponent],
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss'],
  // animations: [fadeInOnScroll],
})
export class LegacyNavbarComponent implements OnInit {
  legacyCards: LegacyCard[] = [
    {
      title: 'Memories',
      description:
        'Metus ridiculus maximus est facilisi dolor ante penatibus cursus litora',
      icon: 'assets/icons/side-bar/memories.svg',
      gradient: 'red-green',
    },
    {
      title: 'Assests',
      description:
        'Metus ridiculus maximus est facilisi dolor ante penatibus cursus litora',
      icon: 'assets/icons/side-bar/assets.svg',
      gradient: 'yellow-green',
    },
    {
      title: 'Notes',
      description:
        'Metus ridiculus maximus est facilisi dolor ante penatibus cursus litora',
      icon: 'assets/icons/side-bar/notes.svg',
      gradient: 'orange-green',
    },
    {
      title: 'Personal Info',
      description:
        'Metus ridiculus maximus est facilisi dolor ante penatibus cursus litora',
      icon: 'assets/icons/side-bar/personal-info.svg',
      gradient: 'red-pink',
    },
    {
      title: 'Secure Passwords',
      description:
        'Metus ridiculus maximus est facilisi dolor ante penatibus cursus litora',
      icon: 'assets/icons/side-bar/passwords.svg',
      gradient: 'purple-orange',
    },
  ];

  planCards: PlanCard[] = [
    {
      title: 'Legacy Creation Plan',
      price: 6.35,
      description:
        'Leave the comfort of the sound of your voice. Make a video of you talking singing etc. (Look in the Moments to share section for talking topics). Includes the advanced auto-obituary plan plus video memories, picture stories, audio notes. Highlight your significant moments in past, present & future years.',
      features: [
        'Record up to ten – 3 minute videos per year.',
        'Show up to 30 family pictures w/ audio recorded descriptions.',
      ],
      gradient: 'blue',
    },
    {
      title: 'Ultimate Legacy Creation Plan',
      price: 10.9,
      description:
        'Includes legacy creation plan plus additional videos, pictures and audio notes.',
      features: [
        'Records an additional 40 – three minute videos per year.',
        'Show an additional 60 pictures with audio notes.',
      ],
      gradient: 'yellow',
    },
  ];

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
        .querySelectorAll('.legacy-cards-section, .plan-cards-section')
        .forEach((section) => observer.observe(section));
    }, 100);
  }
}
