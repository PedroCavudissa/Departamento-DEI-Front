import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private notification: NotificationService
  ) {
    this.form = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('novaSenha')?.value === form.get('confirmarSenha')?.value
      ? null : { mismatch: true };
  }

  alterarSenha() {
    if (this.form.invalid) return;
  
    const { senhaAtual, novaSenha } = this.form.value;
    console.log('Payload enviado:', { currentPassword: senhaAtual, newPassword: novaSenha });
  
    this.loginService.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: () => {
        this.notification.success('Senha alterada com sucesso!');
  
        const usuarioRaw = localStorage.getItem('usuario');
        if (usuarioRaw) {
          const usuario = JSON.parse(usuarioRaw);
          usuario.mustChangePassword = false; // garante que não redirecione de novo
          localStorage.setItem('usuario', JSON.stringify(usuario));
  
          switch (usuario.role) {
            case 'ADMIN':
              this.router.navigate(['/menu-admin']);
              break;
            case 'PROFESSOR':
              this.router.navigate(['/tela-professor']);
              break;
            case 'ESTUDANTE':
              this.router.navigate(['/tela-estudante']);
              break;
            case 'SECRETARIA':
              this.router.navigate(['/menu-secretaria']);
              break;
            default:
              this.router.navigate(['/login']);
          }
        }
      },
      error: (err) => {
        console.error('Erro ao alterar senha:', err);
        this.notification.error('Não foi possível alterar a senha. Verifique os dados e tente novamente.');
      }
    });
  }
  
}
