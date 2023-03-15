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
export class RenameDialogComponent  {
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
      console.log(data.user);
    })
    // this.store.dispatch(FileActions.getFilesByUserId({ userId: this.user.userId! }));
  }

  closeDialog() {

    this.dialogRef.close();
  }


  test() {
    let newName = this.input.nativeElement.value;

    this.files$.subscribe((data) => {
      console.log(data.file);

      // if (data.loading == false) {
        this.file = { ...data.file! };
        this.file.title = newName;
        this.file.createdBy = data.file?.createdBy!;
        this.file.createdDate = data.file?.createdDate!;
      // }
    });
    console.log(this.file);

    this.store.dispatch(
      FileActions.updateFile({
        fileId: this.idToUpdate,
        file: {
          ...this.file,
          title: newName,
          createdBy: this.file.createdBy,
          createdDate: this.file.createdDate,
        },
      })
    );
    this.dialogRef.close();

  }
}
