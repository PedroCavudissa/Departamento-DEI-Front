export type ModeloNota = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type NotaCampo =
  | 'ac1' | 'p1'
  | 'ac2' | 'p2'
  | 'ms' | 'exame' | 'recurso'
  | 'exameOral' | 'exameEspecial'
  | 'mf' | 'rs';

export interface NotaDisciplinaRequest {
  disciplina: string;
  modelo: ModeloNota;
  anoLetivo?: number;
}

export interface NotaDisciplinaBody {
  id?: number;
  estudanteNome?: string;
  disciplinaNome?: string;
  ac1?: number | null;
  p1?: number | null;
  ac2?: number | null;
  p2?: number | null;
  ms?: number | null;
  exame?: number | null;
  recurso?: number | null;
  exameOral?: number | null;
  exameEspecial?: number | null;
  mf?: number | null;
  rs?: string | null;
  mensagem?: string;
}

export interface NotaDisciplinaResponse {
  headers: Record<string, string>;
  body: NotaDisciplinaBody | string;
  statusCode: string;
  statusCodeValue: number;
}
