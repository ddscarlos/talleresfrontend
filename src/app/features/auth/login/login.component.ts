import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  mostrarPassword = false;
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Si ya está autenticado, redirigir a talleres
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/talleres']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recordarme: [false]
    });

    // Obtener URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/talleres';
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.loading = false;
          // Recordar credenciales si lo desea
          if (this.loginForm.value.recordarme) {
            localStorage.setItem('emailRecordado', this.loginForm.value.email);
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error && error.error.message 
            ? error.error.message 
            : 'Error al iniciar sesión. Verifica tus credenciales.';
        }
      );
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }

  recuperarPassword(): void {
    // TODO: Implementar recuperación de contraseña
    alert('Función en desarrollo');
  }
}
