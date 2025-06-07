
export interface PerfilEstudante {
  id: number;
  nome: string;
  apelido: string;
  dataNascimento: string;
  numIdentificacao: string; 
  tipoDocumento: string;
  endereco: string;
  contacto: number;
  dataIngresso: string;
 mostrarModal: boolean;
  errorMessage: string | null;

}
