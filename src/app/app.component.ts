import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DailorDev';
  constructor(private router: Router) {
    // ...
  }
  contact(){
    this.router.navigate(['/', 'contact']);
  }
  About(){
    this.router.navigate(['/', 'about']);
  }
  Portafolio(){
    this.router.navigate(['/', 'portafolio']);
  }
  Home(){
    this.router.navigate(['/', 'home']);
  }
}
