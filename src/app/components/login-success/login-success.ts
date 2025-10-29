import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../services/apiservices/auth';

@Component({
  selector: 'app-login-success',
  imports: [],
  templateUrl: './login-success.html',
  styleUrl: './login-success.scss'
})
export class LoginSuccess implements OnInit{
  message = 'Processando login...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit() {
    try {
      this.route.queryParams.subscribe((params) => {
        const token = params['token'];
        if (token) {
          this.authService.saveToken(token);
          this.router.navigate(['/home']);
        } else {
          this.message = 'Falha ao receber o token de login.';
        }
      });
    } catch (error) {
      console.error('Erro ao processar login:', error);
      this.message = 'Erro ao concluir o login. Tente novamente.';
    }
  }

}
