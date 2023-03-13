import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/service/file.service';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { AuthState } from 'src/ngrx/states/auth.states';
import { FileState } from 'src/ngrx/states/file.states';
import { MatMenuModule } from '@angular/material/menu';
import { Route, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { File } from 'src/app/model/file.model';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  userId!: string | null;
  files$: Observable<FileState>;
  auth$ = this.store.select('auth');
  arr: Array<File> = [];
  arr2: Array<File> = [];
  constructor(
    private route: Router,
    private fileService: FileService,
    private store: Store<{ auth: AuthState; file: FileState }>,
    private dialog: MatDialog
  ) {
    this.auth$ = this.store.select('auth');
    this.files$ = this.store.select('file');
    this.auth$.subscribe((res) => {
        // console.log(this.fileService.currentUserId)
        // this.userId = this.fileService.currentUserId;
        // console.log(this.userId);
    });
    this.store.dispatch(FileActions.getFilesByUserId({ userId: localStorage.getItem('userId')! }));
    this.appendItems();
  }

  ngOnInit() {
    this.files$.subscribe((data) => {
      this.arr = data.files.slice(0, 8);
      this.arr2 = data.files;
    });
  }

  selectFile(fileId: string) {
    this.store.dispatch(FileActions.getFileById({ fileId: fileId }));
    this.files$.subscribe((res) => {
      console.log(res.file);
      this.fileService.currentFile = res.file!;
      this.fileService.idParam = res.file?.fileId!;
      this.fileService.isSelected = true;
    })
    // console.log(file);
    setTimeout(() => {
      this.route.navigate([`/spreadsheet/${fileId}`]);
    },1500)
  }

  canRename(ownerId: string) {
    if (ownerId == this.userId) return true;
    else return false;
  }

  deleleFile(fileId: string) {
    this.store.dispatch(FileActions.deleteFile({ fileId: fileId }));
  }

  openDialog() {
    this.dialog.open(RenameDialogComponent);
    this.store.dispatch(FileActions.getFileById({ fileId: this.fileService.idToUpdate! }));
  }

  getId(fileId: string) {
    this.fileService.idToUpdate = fileId;
  }

  onScrollDown(ev: any) {
    this.appendItems();
  }

  appendItems() {
    this.addItems('push');
  }

  addItems(_method: string) {
    for (let i = 7; this.arr.length <= this.arr2.length; i++) {
      this.arr.push(this.arr2[i]);
    }
  }
}
