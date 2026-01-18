import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prenota.html',
  styleUrls: ['./prenota.css']
})
export class Prenota {

  // --- Firebase ---
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // --- Navbar & UI ---
  mobileMenuOpen = false;
  isScrolled = false;
  username: string | null = 'Utente';

  // --- prenota ---
  dataScelta: string = '';

  /* ================= NAVBAR LOGIC ================= */
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (this.mobileMenuOpen) this.toggleMobileMenu();
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

  /* ================= PRENOTA LOGIC ================= */
  async confermaPrenotazione() {
    if (!this.dataScelta) {
      alert('Seleziona una data valida.');
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      alert('Devi effettuare il login per prenotare.');
      return;
    }

    try {
      const prenotazioniRef = collection(this.firestore, 'prenotazioni');
      const q = query(prenotazioniRef, where('data', '==', this.dataScelta));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('ERRORE: Questa data è già occupata. Scegli un altro giorno.');
        return;
      }

      await addDoc(prenotazioniRef, {
        data: this.dataScelta,
        email: user.email,
        userId: user.uid,
        servizio: 'Consulenza'
      });

      alert('Prenotazione confermata per il giorno: ' + this.dataScelta);
      this.dataScelta = '';

    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore durante la prenotazione.');
    }
  }
}
