import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Dailor| Dev';
  name = 'Jose San Martin';
  role = 'FullStack Developer';

  // Textos a mostrar con efecto typewriter
  displayedGreeting = '';
  displayedIntro = '';
  displayedName = '';
  
  // Para el rol con efecto de loop (escribe y borra)
  displayedRole = '';
  roles: string[] = ['FullStack Developer'];
  currentRoleIndex = 0;
  
  // Control de animaciones
  private timeouts: any[] = [];
  showCursor = true;
  isTypingComplete = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    // Limpiar todos los timeouts al destruir el componente
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  private startTypingAnimation(): void {
    const greeting = 'Hi there,';
    const intro = 'I am';
    const name = this.name;

    let delay = 0;
    const typingSpeed = 80; // ms por letra
    const pauseBetweenLines = 300; // pausa entre líneas

    // Escribir "Hi there,"
    this.typeText(greeting, 'greeting', delay, typingSpeed);
    delay += greeting.length * typingSpeed + pauseBetweenLines;

    // Escribir "I am"
    this.typeText(intro, 'intro', delay, typingSpeed);
    delay += intro.length * typingSpeed + pauseBetweenLines;

    // Escribir el nombre
    this.typeText(name, 'name', delay, typingSpeed);
    delay += name.length * typingSpeed + pauseBetweenLines;

    // Iniciar el loop del rol
    const timeout = setTimeout(() => {
      this.isTypingComplete = true;
      this.startRoleLoop();
    }, delay);
    this.timeouts.push(timeout);
  }

  private typeText(text: string, target: 'greeting' | 'intro' | 'name', startDelay: number, speed: number): void {
    for (let i = 0; i <= text.length; i++) {
      const timeout = setTimeout(() => {
        switch (target) {
          case 'greeting':
            this.displayedGreeting = text.substring(0, i);
            break;
          case 'intro':
            this.displayedIntro = text.substring(0, i);
            break;
          case 'name':
            this.displayedName = text.substring(0, i);
            break;
        }
      }, startDelay + i * speed);
      this.timeouts.push(timeout);
    }
  }

  private startRoleLoop(): void {
    this.typeRole();
  }

  private typeRole(): void {
    const currentRole = this.roles[this.currentRoleIndex];
    const typingSpeed = 60;
    const deleteSpeed = 40;
    const pauseAfterType = 2000; // Pausa después de escribir
    const pauseAfterDelete = 500; // Pausa después de borrar

    // Escribir el rol letra por letra
    for (let i = 0; i <= currentRole.length; i++) {
      const timeout = setTimeout(() => {
        this.displayedRole = currentRole.substring(0, i);
      }, i * typingSpeed);
      this.timeouts.push(timeout);
    }

    // Después de escribir, esperar y luego borrar
    const deleteStartDelay = currentRole.length * typingSpeed + pauseAfterType;

    for (let i = currentRole.length; i >= 0; i--) {
      const timeout = setTimeout(() => {
        this.displayedRole = currentRole.substring(0, i);
      }, deleteStartDelay + (currentRole.length - i) * deleteSpeed);
      this.timeouts.push(timeout);
    }

    // Pasar al siguiente rol y repetir
    const nextRoleDelay = deleteStartDelay + currentRole.length * deleteSpeed + pauseAfterDelete;
    const timeout = setTimeout(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.typeRole();
    }, nextRoleDelay);
    this.timeouts.push(timeout);
  }

  contact(): void {
    this.router.navigate(['/', 'contact']);
  }
}