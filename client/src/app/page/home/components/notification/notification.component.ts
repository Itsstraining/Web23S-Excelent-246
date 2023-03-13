import { InvitationState } from './../../../../../ngrx/states/invitation.state';
import { AuthState } from './../../../../../ngrx/states/auth.states';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvitationActions } from 'src/ngrx/actions/invitation.action';
import { InviteService } from 'src/app/service/invite.service';
import { Invitation } from 'src/app/model/invitation.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{

  auth$ = this.store.select('auth');
  invites$!: Observable<InvitationState>;
  invites!: Invitation[];
  userId!:string;
  constructor(private store: Store<{auth: AuthState, invite: InvitationState}>, private inviteService: InviteService) {
    this.auth$.subscribe((auth) => {
      this.userId = auth.user?.userId ?? '';
      console.log(auth.user);
    })
    this.invites$ = this.store.select('invite');
    this.store.dispatch(InvitationActions.getInvitations({idReceiver: this.userId}));
    this.invites$.subscribe((res) => {
      console.log(res.invitations)
    })
  }

  ngOnInit(){

  }

  accept(idFile:string, idReciever:string, idInvitation:string, invitation: Invitation){
    this.store.dispatch(InvitationActions.acceptInvitation({idFile, idReceiver: idReciever, idInvitation, invitation}));
    // this.store.dispatch(InvitationActions.getInvitations({idReceiver: this.userId}));
  }

  reject(idInvitation:string){
    this.store.dispatch(InvitationActions.rejectInvitation({idInvitation}));
  }
}
