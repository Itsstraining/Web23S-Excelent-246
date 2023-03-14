import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { File } from 'src/app/model/file.model';
import { FileService } from 'src/app/service/file.service';
import { AuthState } from 'src/ngrx/states/auth.states';
import { FileState } from 'src/ngrx/states/file.states';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-mini-file',
  templateUrl: './mini-file.component.html',
  styleUrls: ['./mini-file.component.scss']
})
export class MiniFileComponent {
  userId!:string | null;
  files$:Observable<FileState>;
  auth$ = this.store.select('auth');
  filesToOpen!: File[];
  user!: User;
  constructor(private fileService: FileService, private store: Store<{auth:AuthState, file: FileState}>, private router: Router, private dialog: MatDialog,
    private socket: Socket) {
    this.auth$.subscribe((res) => {
      this.user = res.user!;
      this.userId = res.user?.userId!;
    })
    this.files$ = this.store.select('file');
    // this.store.dispatch(FileActions.getFilesByUserId({ userId: this.userId! }));
    this.files$.subscribe((res) => {
      if(res){
        this.filesToOpen = res.files.filter((file) => file.fileId != this.fileService.idParam);
        console.log(res.files); 
      }
    })
  }

  getFileById(file: File){
    this.fileService.currentFile = file;
    this.fileService.idParam = file.fileId;
    this.fileService.isSelected = true;
    // this.join(file.fileId, this.user);
    // this.watchRoomChange();
    // this.fileService.openFile()
    this.router.navigate(['/spreadsheet', file.fileId]);
    console.log(this.fileService.currentFile?.data);
    this.dialog.closeAll();
    this.fileService.openFile(this.fileService.spreadsheet, this.fileService.currentFile)
  }


  join(fileId: string, user: User){
    let payload = {
      fileId: fileId,
      user: user
    }
    // console.log('join' + payload.fileId);
    this.socket.emit('joinRoom', payload);
  }

  watchRoomChange() {
    return new Observable((observer) => {
      this.socket.on('update-room', (data: any) => {
        console.log(data);
        observer.next(data);
      })
    })
  }
}
