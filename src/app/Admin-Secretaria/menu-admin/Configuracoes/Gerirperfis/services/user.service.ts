import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  role: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://d7f0-2a09-bac5-63-46e-00-71-47.ngrok-free.app/api/auth/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      // A API retorna um objeto com `content`, então pegamos o array
      map(res => res.content as User[])
    );
  }

  updateUserStatus(userId: number, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/status`, { active: status });
  }
}
