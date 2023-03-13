import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/service/file.service';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { AuthState } from 'src/ngrx/states/auth.states';
import { FileState } from 'src/ngrx/states/file.states';
import { MatMenuModule } from '@angular/material/menu';
import { File } from 'src/app/model/file.model';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { MaintainingComponent } from '../maintaining/maintaining.component';
@Component({
  selector: 'app-fillter',
  templateUrl: './fillter.component.html',
  styleUrls: ['./fillter.component.scss'],
})
export class FillterComponent {
  id!: string | undefined;
  userId!: string | null;
  files$: Observable<FileState>;
  auth$ = this.store.select('auth');
  constructor(
    private fileService: FileService,
    private store: Store<{ auth: AuthState; file: FileState }>,
    private dialog: MatDialog
  ) {
    this.auth$.subscribe((res) => {
      if(res.loading == false){
        this.userId = res.user?.userId!
      }
    });
    this.files$ = this.store.select('file');
  }

  onChange(event: any) {
    if (event?.target.value == 0) {
      this.store.dispatch(
        FileActions.getFilesByUserId({ userId: this.userId! })
      );
    } else {
      this.store.dispatch(
        FileActions.getFilesByMemberId({ memberId: this.userId! })
      );
    }
  }

  optionChoices = [
    {
      name: 'Owned by me',
      value: 0,
    },
    {
      name: 'Shared with me',
      value: 1,
    },
  ];

  openDialog() {
    this.dialog.open(MaintainingComponent);
  }

  openFile() {
    this.dialog.open(FileDialogComponent);
  }

  getFilesByDate() {
    this.store.dispatch(FileActions.getFilesByDate());
  }

  getFilesByTitle() {
    this.store.dispatch(FileActions.getFilesByTitle());
  }

}
