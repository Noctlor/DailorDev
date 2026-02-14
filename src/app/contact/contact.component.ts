import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  // ⚠️ REEMPLAZA ESTOS VALORES CON LOS TUYOS DE EMAILJS
  private emailjsServiceId = 'service_g5t4nbu';      // Ej: 'service_abc123'
  private emailjsTemplateId = 'template_zy0lsld';    // Ej: 'template_xyz789'
  private emailjsPublicKey = 'HZG-W5PLFO6hkuR78';      // Ej: 'abcdefghijk123456'

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.showSuccess = false;
      this.showError = false;

      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        message: this.contactForm.value.message,
        to_email: 'dailor5212@gmail.com' // Tu email
      };

      try {
        await emailjs.send(
          this.emailjsServiceId,
          this.emailjsTemplateId,
          templateParams,
          this.emailjsPublicKey
        );

        this.showSuccess = true;
        this.contactForm.reset();
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);

      } catch (error: any) {
        this.showError = true;
        this.errorMessage = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
        console.error('EmailJS Error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helpers para mostrar errores en el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
   // Here you would typically send the form data to a server      HZG-W5PLFO6hkuR78