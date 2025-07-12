import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: ContactForm = {
    name: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  };

  ngOnInit() {
    this.initScrollAnimation();
  }

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Here you would typically send the form to your backend
    alert('Thank you for your message! We will get back to you soon.');
    this.resetForm();
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      company: '',
      email: '',
      subject: '',
      message: '',
    };
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
        .querySelectorAll('.contact-section, .cta-section')
        .forEach((section) => observer.observe(section));
    }, 100);
  }
}
