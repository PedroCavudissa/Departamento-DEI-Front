// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuarioRaw = localStorage.getItem('usuario');
    
    if (!usuarioRaw) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const usuario = JSON.parse(usuarioRaw);
      const token = usuario.token;
      const roleUsuario = usuario.role;

      // Obter roles exigidos pela rota
      const rolesExigidos = route.data['role'] as string[];

      if (!token || !roleUsuario) {
        this.router.navigate(['/login']);
        return false;
      }

      // Se a rota não exige roles específicos
      if (!rolesExigidos || rolesExigidos.length === 0) {
        return true;
      }

      // Verificar se o usuário tem permissão
      if (rolesExigidos.includes(roleUsuario)) {
        return true;
      }

      // Redirecionar se não tiver permissão
      this.router.navigate(['/login']);
      return false;

    } catch (e) {
      console.error('Erro ao parsear usuário:', e);
      this.router.navigate(['/login']);
      return false;
    }
  }
}