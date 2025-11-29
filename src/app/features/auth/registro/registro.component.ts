import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  mostrarPassword = false;
  mostrarConfirmarPassword = false;

  // Validación de contraseña
  passwordRequirements = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false
  };

  tiposDocumento = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'Carnet de Extranjería' },
    { value: 'PP', label: 'Pasaporte' }
  ];

  departamentos = [
    { value: 'LIMA', label: 'Lima' },
    { value: 'CUSCO', label: 'Cusco' },
    { value: 'AREQUIPA', label: 'Arequipa' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      // Datos personales
      tipo_documento: ['DNI', Validators.required],
      numero_documento: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      
      // Datos de contacto
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      
      // Dirección (opcional)
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      direccion: [''],
      
      // Contraseña
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmar_password: ['', Validators.required],
      
      // Términos
      terminos: [false, Validators.requiredTrue]
    }, { 
      validators: this.passwordMatchValidator() 
    });

    // Escuchar cambios en contraseña para validaciones
    const passwordControl = this.registroForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(() => {
        this.validarRequisitosPassword();
      });
    }
  }

  // Validador personalizado: contraseñas coinciden
  passwordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmar = control.get('confirmar_password');

      if (!password || !confirmar) {
        return null;
      }

      return password.value === confirmar.value ? null : { passwordMismatch: true };
    };
  }

  // Validar requisitos de contraseña
  validarRequisitosPassword(): void {
    const passwordControl = this.registroForm.get('password');
    const password = passwordControl ? passwordControl.value || '' : '';

    this.passwordRequirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password)
    };
  }

  // Toggle para mostrar/ocultar contraseña
  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmarPassword(): void {
    this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword;
  }

  // Validar edad del usuario
  calcularEdad(): number {
    const fechaNacControl = this.registroForm.get('fecha_nacimiento');
    const fechaNac = fechaNacControl ? fechaNacControl.value : null;
    if (!fechaNac) return 0;

    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      // Validar edad mínima
      const edad = this.calcularEdad();
      if (edad < 6) {
        this.errorMessage = 'Debes tener al menos 6 años para registrarte';
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const data: RegisterRequest = {
        tipo_documento: this.registroForm.value.tipo_documento,
        numero_documento: this.registroForm.value.numero_documento,
        nombres: this.registroForm.value.nombres,
        apellidos: this.registroForm.value.apellidos,
        fecha_nacimiento: this.registroForm.value.fecha_nacimiento,
        sexo: this.registroForm.value.sexo,
        telefono: this.registroForm.value.telefono,
        email: this.registroForm.value.email,
        password: this.registroForm.value.password,
        departamento: this.registroForm.value.departamento,
        provincia: this.registroForm.value.provincia,
        distrito: this.registroForm.value.distrito,
        direccion: this.registroForm.value.direccion
      };

      this.authService.register(data).subscribe(
        response => {
          this.loading = false;
          this.successMessage = '¡Registro exitoso! Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/talleres']);
          }, 2000);
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error && error.error.message 
            ? error.error.message 
            : 'Error al registrar usuario. Intenta nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor completa correctamente todos los campos requeridos';
    }
  }

  // Navegación
  irALogin(): void {
    this.router.navigate(['/registro/login']);
  }
}
