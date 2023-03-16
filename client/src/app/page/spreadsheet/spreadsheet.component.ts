import { user } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Spreadsheet, BeforeOpenEventArgs, ActionEventArgs, Workbook, DataSourceChangedEventArgs, FindAllArgs, BeforeActionData, CollaborativeEditing, CollaborativeEditArgs, updateAction,
} from '@syncfusion/ej2-angular-spreadsheet';
import { getApp } from 'firebase/app';
import { File } from 'src/app/model/file.model';
import { AuthService } from 'src/app/service/auth.service';
import { FileService } from 'src/app/service/file.service';
import { AuthState } from 'src/ngrx/states/auth.states';
import { InvitationState } from 'src/ngrx/states/invitation.state';
import { FileState } from 'src/ngrx/states/file.states';
import { ActivatedRoute } from '@angular/router';
import { DataBoundEventArgs, EventArgs } from '@syncfusion/ej2-navigations';
import { User } from 'src/app/model/user.model';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss'],
})
export class SpreadsheetComponent implements OnInit {
  @ViewChild('spreadsheet') spreadsheetObj!: Spreadsheet;
  ngAfterViewInit() {
    setTimeout(() => {
      this.FileService.spreadsheet = this.spreadsheetObj;
    }, 2000)
  }
  // test!: SpreadsheetComponent;
  data$!: Observable<any>;
  tempData: any[] = [];
  newData!: any;
  model!: CollaborativeEditArgs
  temp!: any;
  newFile!: File;
  user!: User;
  users: any[] = [];
  hide() {
    this.spreadsheetObj.hideFileMenuItems(['File'], true);
  }
  file!: File;
  auth$!: Observable<AuthState>
  file$!: Observable<FileState>
  id!: string;
  idParam!: string | null;
  evt!: any;
  response!: any;
  fileToUpdate!: File;

  constructor(
    protected FileService: FileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store<{ auth: AuthState, invite: InvitationState, file: FileState }>
  ) {

    this.FileService.spreadsheet = this.spreadsheetObj;
    // console.log(this.FileService.spreadsheet)
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((auth) => {
      this.user = auth.user!;
      this.id = auth.user?.userId || 'kh co user';
    });
    this.file$ = this.store.select('file');
    // this.store.dispatch(FileActions.getFilesByUserId({userId: this.id!}));
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('id')!;
      this.FileService.idParam = params.get('id')!;
      // console.log(this.FileService.idParam);
    });
    this.store.dispatch(FileActions.getFileById({ fileId: this.FileService.idParam! }));
    this.file$.subscribe((res) => {
      this.FileService.currentFile = res.file;
      // console.log(this.FileService.currentFile);
    })


    this.openFile();

  }


  openFile() {
    setTimeout(() => {
      // console.log(this.FileService.currentFile)
      this.spreadsheetObj.openFromJson({ file: this.FileService.currentFile?.data.jsonObject });


    }, 3000);

  }

  ngOnInit(): void {
    // console.log(this.FileService.currentFile?.data);
    this.joinRoom();
  }

  ngOnChanges(event: any): void {
    this.spreadsheetObj.saveAsJson().then((JsonFile) => {
      // console.log(JsonFile);
      this.response = JsonFile;
    })
    this.file$.subscribe((res) => {
      this.fileToUpdate = { ...res.file! };
      // console.log(this.fileToUpdate)      // console.log(fileToUpdate.data);
    })

    setTimeout(() => {
      let model: CollaborativeEditArgs = { ...event } as CollaborativeEditArgs;
      if (model.action == "gotoSheet") {
        return;
      } else {
        this.FileService.sendDataByFileId(this.FileService.idParam!, event);
      }
      this.fileToUpdate.data = { ...this.response };

      // console.log(this.fileToUpdate.data);
      // console.log(model.eventArgs.address);

    }, 2500)

    setTimeout(() => {
      // console.log(this.fileToUpdate);
      // console.log(this.fileToUpdate.data);
      this.store.dispatch(FileActions.updateFile({ fileId: this.FileService.idParam!, file: { ...this.fileToUpdate, data: { ...this.fileToUpdate.data } } }));
    }, 2500);
  }


  openUrl =
    'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
  saveUrl =
    'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';

  firebaseApp = getApp();

  async upload() {
    let response!: any;
    await this.spreadsheetObj.saveAsJson().then((JsonFile) => {
      // console.log(JsonFile);
      response = { ...JsonFile };
    });
    let fileToUpLoad: File = {
      fileId: Timestamp.now().toMillis().toString(),
      title: 'Tiền đi chợ tháng 3',
      createdBy: 'Trung',
      createdDate: 123,
      modifiedBy: 'Truong',
      modifiedDate: 123,
      ownerId: this.id,
      data: { ...response },
      status: "public",
      members: ['1AVuBiKftySNehyP0B4MkSAEYtB3'],
    }
    this.FileService.addSheet(fileToUpLoad);
  }

  async open() {
    this.spreadsheetObj.openFromJson({
      file: this.file.data.jsonObject,
    })
  }


  joinRoom() {
    this.data$ = this.FileService.getDataByFileId(this.FileService.idParam);
    this.data$.subscribe((res) => {
      if (res !== undefined || res !== null) {
        this.tempData.push(res);
        let model: CollaborativeEditArgs = res.data as CollaborativeEditArgs;
        if (model != undefined || model != null) {
          // console.log(model);
          this.spreadsheetObj.updateAction(model);
        } else {
        }
      }
    })
  }



}


