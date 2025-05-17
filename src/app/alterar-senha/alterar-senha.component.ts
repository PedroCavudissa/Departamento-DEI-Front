import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LateralProfessorComponent } from "../Professor/lateral-professor/lateral-professor.component";

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
   styleUrl:'./alterar-senha.component.css',
  imports: [CommonModule, LateralProfessorComponent, ReactiveFormsModule],
})
export class AlterarSenhaComponent {
  form: FormGroup;
  sucesso: boolean = false; //para mostrar mensagem de sucesso

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        senhaAtual: ['', Validators.required],
        novaSenha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],
      },
      { validators: this.senhasIguais }
    );
  }

  senhasIguais(group: FormGroup) {
    const nova = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return nova === confirmar ? null : { senhasNaoConferem: true };
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
      // aqui você pode chamar o serviço que consome o backend
      this.sucesso = true;

      // limpar os campos após envio
      this.form.reset();
    }
  }
}
