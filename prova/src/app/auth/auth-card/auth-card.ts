import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.html',
  styleUrls: ['./auth-card.css']
})
export class AuthCardComponent {
  @Input() title: string = '';
}