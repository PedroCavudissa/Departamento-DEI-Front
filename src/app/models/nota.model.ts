// src/app/tela-notas/models/nota.model.ts
export type ModeloNota = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ResultadoStatus = 'APROVADO' | 'REPROVADO' | 'EM_CURSO' | 'TRANCADO' | 'DESISTIU';

export interface DisciplinaNota {
  id: number;
  estudanteNome: string;
  disciplinaNome: string;

  // Campos do Modelo A
  ac1?: number | null;
  p1?: number | null;

  // Campos do Modelo B
  ac2?: number | null;
  p2?: number | null;
  ms?: number | null;
  rs?: ResultadoStatus;

  // Campos do Modelo C
  exame?: number | null;
  mf?: number | null;

  // Campos do Modelo D
  recurso?: number | null;

  // Campos do Modelo E
  exameOral?: number | null;

  // Campos do Modelo F
  exameEspecial?: number | null;
}

export interface NotaFilter {
  modelo: ModeloNota;
  anoLetivo?: number;
}
