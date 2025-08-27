import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuarioRaw = localStorage.getItem('usuario');

    // Usuário não logado → redireciona para login
    if (!usuarioRaw) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const usuario = JSON.parse(usuarioRaw);
      const token = usuario.token;
      const roleUsuario = usuario.role;
      const senhaTrocada = usuario.senhaTrocada; // vem do backend

      // Se não tiver token ou role → força login
      if (!token || !roleUsuario) {
        this.router.navigate(['/login']);
        return false;
      }

      //  Se a senha ainda não foi trocada → obriga ir para tela de redefinição
      if (usuario.mustChangePassword) {
        this.router.navigate(['/alterar-senha']);
        return false;
      }

      // Roles exigidos pela rota
      const rolesExigidos = route.data['role'] as string[];

      // Se rota não exige roles → qualquer usuário autenticado passa
      if (!rolesExigidos || rolesExigidos.length === 0) {
        return true;
      }

      // Verificar se o usuário tem a role exigida
      if (rolesExigidos.includes(roleUsuario)) {
        return true;
      }

      // Usuário autenticado mas sem permissão → acesso negado
      this.router.navigate(['/acesso-negado']);
      return false;

    } catch (e) {
      console.error('Erro ao parsear usuário:', e);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
