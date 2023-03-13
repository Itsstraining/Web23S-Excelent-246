import { Component, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(public authService: AuthService, private fileService: FileService) {
  }

}
