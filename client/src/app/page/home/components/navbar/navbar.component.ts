import { MatDialog } from '@angular/material/dialog';
import { InvitationActions } from './../../../../../ngrx/actions/invitation.action';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import { AuthActions } from 'src/ngrx/actions/auth.actions';
import { AuthState } from 'src/ngrx/states/auth.states';
import { InvitationState } from 'src/ngrx/states/invitation.state';
import { NotificationComponent } from '../notification/notification.component';
import { InviteService } from 'src/app/service/invite.service';
import { Router } from '@angular/router';
import { FileService } from 'src/app/service/file.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userId!: string;
  auth$ = this.store.select('auth');
  invites$!: Observable<InvitationState>;
  invitesCount = 0;
  // inviteCount!:number;
  constructor(
    public auth: AuthService,
    protected inviteService: InviteService,
    private store: Store<{ auth: AuthState; invite: InvitationState }>,
    private dialog: MatDialog,
    public router:Router,
    private fileService: FileService
  ) {
    this.auth$.subscribe((auth) => {
      if(auth.loading == false){
        this.userId = auth.user?.userId !;
        // console.log(this.userId);
      }
      
    });

    this.invites$ = this.store.select('invite');
    this.store.dispatch(
      InvitationActions.getInvitations({ idReceiver: this.userId })
    );
    this.invites$.subscribe((invites) => {
      let count = 0;
      invites.invitations.forEach((invite) => {
        if (invite.status == 'pending') {
          count++;
        }
      });
      this.invitesCount = count;
    });
  }

  open() {
    this.dialog.open(NotificationComponent);
  }

  navigateToLandingPage() {
    this.router.navigate([''])
  }

  ngOnInit() {
    
  }

  logout = false;

  clickToLogOut() {
    return (this.logout = true);
  }
  turnOffLogOut() {
    this.logout = false;
  }
}
