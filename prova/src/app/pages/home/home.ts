import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  // --- Proprietà Utente ---
  email: string | null = null;
  username: string | null = null;

  // --- Proprietà UI ---
  isScrolled = false; // Navbar cambia stile allo scroll
  mobileMenuOpen = false; // Controlla menu a tendina mobile

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Recupero utente loggato
    this.auth.currentUser$.subscribe(user => {
      this.email = user ? user.email : null;
      this.username = this.email ? this.email.split('@')[0] : null;
    });
  }

  // --- Scroll listener ---
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // --- Scroll verso sezione ---
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Chiudo menu mobile se aperto
      if (this.mobileMenuOpen) this.toggleMobileMenu();
    }
  }

  // --- Toggle menu mobile ---
toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}
}