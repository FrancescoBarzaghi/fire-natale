import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
export class Catalogo implements OnInit {

  prodotti$: Observable<Prodotto[]>;

  // --- Navbar & UI ---
  mobileMenuOpen = false;        
  isScrolled = false;            
  username: string | null = 'Utente'; 

  constructor(private firestore: Firestore, private router: Router) {
    const prodottiRef = collection(this.firestore, 'prodotti');
    this.prodotti$ = collectionData(prodottiRef, { idField: 'id' }) as Observable<Prodotto[]>;
  }

  ngOnInit(): void {}

  // Toggle menu hamburger
  toggleMobileMenu() { this.mobileMenuOpen = !this.mobileMenuOpen; }

  // Scroll listener per ridurre padding navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Scroll interno per Catalogo o prenota
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (this.mobileMenuOpen) this.toggleMobileMenu();
  }

  // Vai alla Home page reale
  goToHome() {
    this.router.navigate(['/home']); 
  }

  goToCatalogo() {
    this.scrollToSection('catalogo');
  }
  prenota() {
  alert('Hai cliccato su Prenota!');
  // Qui puoi aggiungere logica reale, es. navigazione a pagina prenotazioni
}
}
