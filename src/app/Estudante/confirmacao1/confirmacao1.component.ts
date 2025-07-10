import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralComponent } from "../lateral/lateral.component";

@Component({
  selector: 'app-confirmacao1',
  imports: [CommonModule, LateralComponent],
  templateUrl: './confirmacao1.component.html',
  styleUrl: './confirmacao1.component.css'
})
export class Confirmacao1Component {
  constructor(private router: Router) {}

   disciplinasfaze = [
    { codigo: 'MAT101', nome: 'Matemática Básica' },
    { codigo: 'FIS102', nome: 'Física I' },
    { codigo: 'QUI103', nome: 'Química Geral' },
    { codigo: 'BIO104', nome: 'Biologia Celular' },
    { codigo: 'HIS105', nome: 'História Moderna' },
    { codigo: 'GEO106', nome: 'Geografia Física' },
    { codigo: 'POR107', nome: 'Português Instrumental' },
  ];

   disciplinasAtrasadas = [
  { codigo: 'MAT202', nome: 'Cálculo II' },
  { codigo: 'FIS203', nome: 'Física II' },
   { codigo: 'FIS203', nome: 'Física II' }
];

confi2() {
  this.router.navigate(['/confirmacao2']);
}

}
