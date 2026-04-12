import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      id: 1,
      title: 'GreenTek Contact',
      description: 'Business contact page with modern design, contact form integrated with EmailJS, and responsive design.',
      image: 'assets/img/projects/greentek-contact.png',
      url: 'https://contactmegts.netlify.app/',
      tags: ['Angular', 'EmailJS']
    },
    // Puedes agregar más proyectos aquí
    // {
    //   id: 2,
    //   title: 'Otro Proyecto',
    //   description: 'Descripción del proyecto...',
    //   image: 'assets/img/projects/otro-proyecto.png',
    //   url: 'https://otro-proyecto.netlify.app/',
    //   tags: ['Angular', 'NestJS', 'PostgreSQL']
    // },
  ];

  // Variables para el efecto tilt
  private currentCard: HTMLElement | null = null;

  onMouseMove(event: MouseEvent, cardElement: HTMLElement): void {
    this.currentCard = cardElement;
    const card = cardElement;
    const rect = card.getBoundingClientRect();
    
    // Calcular posición del mouse relativa al centro del card
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular rotación (máximo 15 grados)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // Aplicar transformación
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Efecto de brillo que sigue al mouse
    const glare = card.querySelector('.card-glare') as HTMLElement;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    }
  }

  onMouseLeave(cardElement: HTMLElement): void {
    cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const glare = cardElement.querySelector('.card-glare') as HTMLElement;
    if (glare) {
      glare.style.background = 'transparent';
    }
  }

  openProject(url: string): void {
    window.open(url, '_blank');
  }
}