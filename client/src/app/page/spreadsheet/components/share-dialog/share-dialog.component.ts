import { AuthActions } from 'src/ngrx/actions/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from 'src/ngrx/states/auth.states';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../../model/user.model'
import { InvitationState } from 'src/ngrx/states/invitation.state';
import { InvitationActions } from 'src/ngrx/actions/invitation.action';
import { ActivatedRoute } from '@angular/router';
import { Invitation } from 'src/app/model/invitation.model';
import { Timestamp } from 'firebase/firestore';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { FileState } from 'src/ngrx/states/file.states';
import { FileService } from 'src/app/service/file.service';
import {LoadingComponent} from '../../../../components/loading/loading.component'
import { File } from 'src/app/model/file.model';
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent {

  id!:string;
  idParam!:string | null;
  fileName!:string;
  users$!: Observable<AuthState>;
  user!:User;
  invites$!: Observable<InvitationState>
  files$!: Observable<FileState>
  filterItem: User[] = [];
  allItems: Array<User> = [];
  currentFile!: File;
  isInvited!: boolean;
  // send = document.getElementsByClassName('send');
  constructor(private store: Store<{ auth: AuthState, invite: InvitationState, file: FileState }>, private route: ActivatedRoute,
    private fileService: FileService) {
      this.files$ = this.store.select('file');
      this.invites$ = this.store.select('invite');
      this.store.dispatch(FileActions.getFileById({ fileId: this.fileService.idParam! }));
      this.files$.subscribe((data) => {
      if(data.loading == false){
        this.currentFile = data.file!;
        console.log(data.file);
        this.fileName = data.file?.title!;
        console.log(this.fileName);
        
        }
    })
    this.users$ = this.store.select('auth');
    this.store.dispatch(AuthActions.getAllUsers());
    this.users$.subscribe((data) => {
      this.id = data.user?.userId ?? '';
      this.user = data.user!;
      if (data.users != null && data.users.length != 0) {
        this.allItems = data.users;
        this.filterItem = data.users;
      }
    })
  }
  searchItemByKeyword(event: any) {
    if (event.target.value.trim() == '') {
      this.filterItem = this.allItems;

      return;
    }
    else {
      this.filterItem = this.allItems!.filter((user: User) => {
        return user.email!.toLowerCase().includes(event.target.value.toLowerCase())
      })
    }
  }

  sendInvite(receiver: User) {
    let index = this.currentFile.members.findIndex((res) => res == receiver.userId)
    if(index == -1){
      console.log(this.fileService.idParam);
      if(this.fileService.idParam!=null){
        let invitation:Invitation = {
          id: Timestamp.now().toMillis().toString(),
          from: this.user.userId!,
          name: this.user.userName!,
          to: receiver.userId!,
          status: 'pending',
          fileId: this.fileService.idParam,
          fileName: this.fileName,
      }
      console.log(invitation);
      this.store.dispatch(InvitationActions.sendInvitation({invitation: invitation, idReceiver: receiver.userId!}));}
    }else{
      return;
    }
  }
}
