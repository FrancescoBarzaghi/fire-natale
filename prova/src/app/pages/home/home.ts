import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  // --- Utente ---
  email: string | null = null;
  username: string | null = null;

  // --- UI ---
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.email = user ? user.email : null;
      this.username = this.email ? this.email.split('@')[0] : null;
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (this.mobileMenuOpen) this.toggleMobileMenu();
    }
  }
  goToHome() {
  if (this.mobileMenuOpen) this.toggleMobileMenu();
  this.router.navigate(['/home']);
  }

  goToCatalogo() {
    if (this.mobileMenuOpen) this.toggleMobileMenu();
    this.router.navigate(['/catalogo']);
  }

  goToPrenota() {
    if (this.mobileMenuOpen) this.toggleMobileMenu();
    this.router.navigate(['/prenota']);
  }
}
