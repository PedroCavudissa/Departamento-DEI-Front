export interface Comunicado {
  id: number;
  titulo: string;
  conteudo: string;
  nomeFuncionario?: string;
  noticeStatus: 'VALIDO' | 'INVALIDO';
  destinado: 'PROFESSOR' | 'ESTUDANTE' | 'SECRETARIA' | 'ADMINISTRADOR' | 'TODOS';
  dataAcontecimento: string;
  dataPublicacao?: string;
}

export type NovoComunicado = Omit<Comunicado, 'id' | 'nomeFuncionario' | 'dataPublicacao'>;
