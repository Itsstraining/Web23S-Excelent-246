import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { FileService } from 'src/app/service/file.service';
import { AuthActions } from 'src/ngrx/actions/auth.actions';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { AuthState } from 'src/ngrx/states/auth.states';
import { FileState } from 'src/ngrx/states/file.states';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  auth$ = this.store.select('auth');
  constructor(
    private route: Router,
    private authService: AuthService,
    private store: Store<{ auth: AuthState; file: FileState }>
  ) {
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((data)=>{
      
    })

    
  }
  ngOnInit(){
    console.log(localStorage.getItem('userId'))
  }
}
