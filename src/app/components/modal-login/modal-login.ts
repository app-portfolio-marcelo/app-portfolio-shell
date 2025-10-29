import { Component } from '@angular/core';
import { Auth } from '../../services/apiservices/auth';

declare const google: any;

@Component({
  selector: 'app-modal-login',
  imports: [],
  templateUrl: './modal-login.html',
  styleUrl: './modal-login.scss'
})
export class ModalLogin {
  loading = false;
  errorMessage = '';
  constructor(private authService: Auth) {}

  loginWithGoogle() {
        try {
      this.loading = true;
      this.errorMessage = '';
      this.authService.loginWithGoogleRedirect();
    } catch (error) {
      console.error('Erro no login:', error);
      this.errorMessage = 'Erro ao iniciar login com o Google. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }

}
