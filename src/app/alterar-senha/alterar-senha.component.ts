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
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('novaSenha')?.value === form.get('confirmarSenha')?.value
      ? null : { mismatch: true };
  }

  alterarSenha() {
    if (this.form.invalid) {
      if (this.form.controls['novaSenha'].errors?.['minlength']) {
        this.notification.error('A nova senha deve ter pelo menos 8 caracteres.');
      } else {
        this.notification.error('Preencha todos os campos corretamente.');
      }
      return;
    }
  
    const { senhaAtual, novaSenha } = this.form.value;
    this.loginService.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: () => {
        this.notification.success('Senha alterada com sucesso!');
        const usuarioRaw = localStorage.getItem('usuario');
        if (usuarioRaw) {
          const usuario = JSON.parse(usuarioRaw);
          usuario.mustChangePassword = false; 
          localStorage.setItem('usuario', JSON.stringify(usuario));
         
         console.log('Usuário após alteração de senha:', usuario.m);
          switch (usuario.role) {
            case 'ADMINISTRADOR':
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
  
        // Mensagens de Erro
        const msgApi = err.error?.message || '';
  
        if (msgApi.includes('Senha atual incorreta')) {
          this.notification.error('A senha atual está incorreta.');
        } 
        else if (msgApi.includes('Senha muito curta')) {
          this.notification.error('A nova senha é muito curta.');
        } 
        else if (msgApi.includes('Senhas não coincidem')) {
          this.notification.error('As senhas não coincidem.');
        } 
        else {
          this.notification.error('Não foi possível alterar a senha. Tente novamente.');
        }
      }
    });
  }
  
  
}