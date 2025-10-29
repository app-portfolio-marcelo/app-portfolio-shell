import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Inicia o login redirecionando o usuário para o endpoint do backend.
   * O backend fará o redirecionamento para o Google.
   */
  loginWithGoogleRedirect(): void {
     try {
      window.location.href = `${this.apiUrl}/auth/google`;
    } catch (error) {
      console.error('Erro ao redirecionar para login do Google:', error);
      alert('Erro ao iniciar login com o Google. Tente novamente mais tarde.');
    }
  }

  /**
   * Envia o token Google (caso você use o fluxo via id_token)
   */
  loginWithGoogleToken(token: string): Observable<any> {
    return this.http.post<{ token: string; nome: string; email: string }>(
      `${this.apiUrl}/auth/google`,
      { token }
    ).pipe(
      catchError((error) => {
        console.error('Erro ao autenticar com o Google:', error);
        return throwError(() => new Error('Falha ao autenticar com o Google.'));
      })
    ); 
  }

  /**
   * Salva o token JWT da sua aplicação no localStorage
   */
  saveToken(token: string) {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao salvar token no localStorage:', error);
    }
  }

  /**
   * Obtém o token JWT da sua aplicação
   */
  getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Erro ao acessar token no localStorage:', error);
      return null;
    }
  }

  /**
   * Remove o token JWT (logout)
   */
  logout(): void {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Erro ao remover token do localStorage:', error);
    }
  }

   /**
   * Verifica se o usuário está autenticado (token presente)
   */
  isAuthenticated(): boolean {
    try {
      const token = this.getToken();
      return !!token; // simples checagem de existência
    } catch {
      return false;
    }
  }
}
