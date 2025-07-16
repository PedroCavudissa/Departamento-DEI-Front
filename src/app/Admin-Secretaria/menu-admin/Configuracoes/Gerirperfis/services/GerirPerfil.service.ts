import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

interface UserStatus {
  id: number;
  email: string;
  role: string;
  active: boolean;
}

interface StaffMember {
  id: number;
  nome: string;
  cargo: string;
  email?: string;
}

interface Student {
  id: number;
  nome: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GerirPerfilService {
  private baseUrl = 'https://64f433c9d322.ngrok-free.app';

  constructor(private http: HttpClient) {}

  getUserStatus(): Observable<UserStatus[]> {
    return this.http.get<any>(`${this.baseUrl}/api/auth/users`).pipe(
      map(response => response.content.map((user: any) => ({
        id: user.id,
        email: user.email,
        role: user.role,
        active: user.active
      })))
    );
  }

  getStaff(): Observable<StaffMember[]> {
    return this.http.get<any>(`${this.baseUrl}/api/staff`).pipe(
      map(response => response.content.map((staff: any) => ({
        id: staff.id,
        nome: staff.nome,
        cargo: staff.cargo
      })))
    );
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<any>(`${this.baseUrl}/api/departamento/students`).pipe(
      map(response => response.content.map((student: any) => ({
        id: student.id,
        nome: student.nome,
        email: student.email
      })))
    );
  }

  getCompleteData(): Observable<{
    estudantes: any[];
    funcionarios: any[];
  }> {
    return forkJoin({
      status: this.getUserStatus(),
      staff: this.getStaff(),
      students: this.getStudents()
    }).pipe(
      map(({status, staff, students}) => {
        // Combinar estudantes com status por email
        const estudantesComStatus = students.map(student => {
          const statusStudent = status.find(s => s.email === student.email);
          return {
            ...student,
            active: statusStudent?.active || false,
            role: 'ESTUDANTE'
          };
        });

        // Combinar funcionários com status por ID
        const funcionariosComStatus = staff.map(staffMember => {
          const statusStaff = status.find(s => s.id === staffMember.id);
          return {
            ...staffMember,
            active: statusStaff?.active || false,
            role: staffMember.cargo
          };
        });

        return {
          estudantes: estudantesComStatus,
          funcionarios: funcionariosComStatus
        };
      })
    );
  }

  updateUserStatus(id: number, active: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/auth/users/${id}`, { active });
  }
}