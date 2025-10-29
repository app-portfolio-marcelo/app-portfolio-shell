import { Component } from '@angular/core';
import { ModalLogin } from '../modal-login/modal-login';

@Component({
  selector: 'app-header',
  imports: [ ModalLogin ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
