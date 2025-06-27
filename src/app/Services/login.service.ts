/*
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface LoginResponse {
  token: string;
  role: 'admin' | 'secretaria' | 'estudante' | 'professor';
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://dd3f-102-218-85-31.ngrok-free.app/api/auth/login';

  constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<LoginResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  const body = { email, password };

  return this.http.post(this.apiUrl, body, {
    headers,
    observe: 'response',
    responseType: 'text'
  }).pipe(
    tap(resp => {
      console.log('Resposta HTTP completa:', resp);
      console.log('Status:', resp.status);
      console.log('Headers:', resp.headers);
      console.log('Body:', resp.body);
    }),
    map(resp => {
      const responseText = resp.body;
      if (!responseText || responseText.trim() === '') {
        throw new Error('Resposta vazia do login');
      }
      try {
        return JSON.parse(responseText) as LoginResponse;
      } catch {
        throw new Error('Resposta do login não é um JSON válido');
      }
    }),
    catchError(error => {
      // Aqui você trata o erro de forma simples
      console.error('Erro na requisição de login:', error);
      // Pode personalizar a mensagem de erro que vai propagar
      return throwError(() => new Error('Falha ao tentar fazer login. Tente novamente.'));
    })
  );
}
}*/