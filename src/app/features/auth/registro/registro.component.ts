import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.register(this.registroForm.value).subscribe(
        response => {
          this.loading = false;
          this.router.navigate(['/talleres']);
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error && error.error.message ? error.error.message : 'Error al registrar usuario';
        }
      );
    }
  }
}
