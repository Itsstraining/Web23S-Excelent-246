import { AuthState } from 'src/ngrx/states/auth.states';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/service/file.service';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { FileState } from 'src/ngrx/states/file.states';
import { File } from 'src/app/model/file.model';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent implements OnInit {
  files$!: Observable<FileState>;
  users$!: Observable<AuthState>;
  user!: User
  @ViewChild('inputId') input!: ElementRef;
  idToUpdate = this.fileService.idToUpdate;
  file!: File;
  newName = '';
  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    private fileService: FileService,
    private store: Store<{ file: FileState, auth: AuthState}>,
    private router: Router
  ) {
    this.files$ = this.store.select('file');
    this.users$ = this.store.select('auth');
    this.users$.subscribe((data) => {
      this.user = data.user!;
      // console.log(data.user);
    })
    console.log(this.fileService.idToUpdate);


  }

  ngOnInit(): void {
    
  }

  closeDialog() {

    this.dialogRef.close();
  }


  test() {
    this.newName = this.input.nativeElement.value;
    
    // setTimeout(() => {
      this.store.dispatch(FileActions.getFileById({ fileId: this.fileService.idToUpdate}));
      this.files$.subscribe((data) => {
      this.file = {...data.file!}
      console.log(this.file);
      this.file.title = this.newName;
      });
    // },120)

    // console.log(this.file);

    // setTimeout(() => {

    // },500)
    setTimeout(() =>{
      this.store.dispatch(
        FileActions.updateFile({
          fileId: this.idToUpdate,
          file: {
            ...this.file,
            title: this.newName,
          },
        })
      );
    },170)
    this.dialogRef.close();

  }
}
