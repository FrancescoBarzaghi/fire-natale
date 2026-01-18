import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Prodotto {
  id: string;
  nome: string;
  prezzo: number;
  immagine: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class Catalogo {

  prodotti$: Observable<Prodotto[]>;

  // LOGICA NAVBAR
  mobileMenuOpen = false;
  isScrolled = false;
  username = 'Utente'; // opzionale, se vuoi mostrare il nome

  constructor(private firestore: Firestore) {
    const prodottiRef = collection(this.firestore, 'prodotti');
    this.prodotti$ = collectionData(prodottiRef, {
      idField: 'id',
    }) as Observable<Prodotto[]>;
  }

  // Toggle menu hamburger
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Scroll listener per cambiare classe navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Scroll a sezioni interne
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.mobileMenuOpen = false; // chiude menu mobile dopo click
    }
  }
}
