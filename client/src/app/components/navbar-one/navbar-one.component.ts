import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/service/auth.service'

@Component({
  selector: 'app-navbar-one',
  templateUrl: './navbar-one.component.html',
  styleUrls: ['./navbar-one.component.scss']
})
export class NavbarOneComponent {
  constructor(public authService: AuthService, public router: Router) {
  }
  public login() {
    try {
      this.authService.loginGG();
    } catch (err) {
      alert('login fail!');
    }
  }
  ngOnInit() { }

}
