import { Injectable } from '@angular/core';
import {
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
  authState,
  signOut,
} from '@angular/fire/auth';
import { environment } from '../env/environment';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/ngrx/states/auth.states';
import { AuthActions } from 'src/ngrx/actions/auth.actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: any;
  idToken: string = '';

  currentUserId!: string | null;
  constructor(
    private auth: Auth,
    private http: HttpClient,
    private router: Router,
    private authStore: Store<{ auth: AuthState }>
  ) {
    authState(this.auth).subscribe(async (user) => {
      if (user != null) {
        this.currentUserId = user.uid
        localStorage.setItem('userId',user.uid)
        let temp: User = {
          
          userId: user?.uid,
          email: user?.email,
          userName: user?.displayName,
          photoURL: user?.photoURL,
        };
        this.authStore.dispatch(AuthActions.loginSuccess({ user: temp }));
      }
    });
  }  
  // Sign in with Google
  getData() {
    return this.http.get('https://social.runwayclub.dev/api/articles/latest');
  }
  loginGG() {
    const provider = new GoogleAuthProvider();
    return new Promise<User>(async (resolve, reject) => {
      try {
        let result = await signInWithPopup(this.auth, provider);
        if (result) {
          let user: User = {
            userId: result.user?.uid,
            email: result.user?.email,
            userName: result.user?.displayName,
            photoURL: result.user?.photoURL,
          };
          resolve(user);
          this.router.navigate(['home']);
          this.http
            .post(environment.baseUrl + 'auth/sign-in', {
              userId: user.userId,
              email: user.email,
              userName: user.userName,
              photoURL: user.photoURL,
            })
            .subscribe((response) => {
              console.log(response);
            });
        }
      } catch (err) {
        reject(null);
      }
    });
  }
  logOut() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await signOut(this.auth);
        localStorage.removeItem('userInfo');
        resolve('');
        this.router.navigate(['/']);
      } catch (err) {
        reject(err);
      }
    });
  }


  getAllUser(){
    return this.http.get(environment.baseUrl + 'auth/getAllUsers') as Observable<User[]>;
  }
}
