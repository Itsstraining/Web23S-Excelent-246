import { ChatService } from 'src/app/service/chat.service';
import { AuthState } from './../../../../../ngrx/states/auth.states';
import { ShareDialogComponent } from './../share-dialog/share-dialog.component';
import { MenuItemModel } from './../../../../../../node_modules/@syncfusion/ej2-navigations/src/common/menu-base-model.d';
import { Component, ElementRef, ViewChild, HostListener, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
// import { MenuClickEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { MatDialog } from '@angular/material/dialog';
import { OpenFileDialogComponent } from '../open-file-dialog/open-file-dialog.component';
import { FileService } from 'src/app/service/file.service';
import { Store } from '@ngrx/store';
import { FileState } from 'src/ngrx/states/file.states';
import { Observable, Subscription } from 'rxjs';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { User } from 'src/app/model/user.model';
import { AuthActions } from 'src/ngrx/actions/auth.actions';
import { Socket } from 'ngx-socket-io';

import { RenameComponent } from '../rename/rename.component';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy{
  public isEditing: boolean;
  public pendingValue!: string;
  public title = '';
  public valueChangeEvents: EventEmitter<string>;
  files$: Observable<FileState>;
  auth$!: Observable<AuthState>;
  user!: User;
  watchRoom!: Subscription;
  users: Array<any> = [];
  editable = false;
  newName = '';
  constructor(private eRef: ElementRef, private router: Router,
    protected authService: AuthService, private dailog: MatDialog,
    protected fileService: FileService,
    private store: Store<{ file: FileState, auth: AuthState }>, private socket: Socket, private chatService: ChatService,) {
    // this.fileService.currentFile = localStorage.getItem('currentFile');
    // this.pendingValue = this.fileService.currentFile.title!;
    // console.log(this.fileService.currentFile.ownerId)
    this.isEditing = false;
    this.valueChangeEvents = new EventEmitter();
    this.files$ = this.store.select('file');
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((res) => {
      this.user = res.user!;
      // console.log(this.user);
    })
    this.store.dispatch(FileActions.getFilesByUserId({ userId: this.user.userId! }));
    console.log(this.fileService.idParam!)
    this.socket.connect()
    try{
      setTimeout(() => {
      this.join(this.fileService.idParam!,this.user!);
      this.watchRoom = this.watchRoomChange().subscribe((data:any) => {
        // this.users
        data.users.forEach((user:any) => {
          this.users.push(user.userInfo)
          this.chatService.participators.push(user.userInfo);
          console.log(user.userInfo);
          // console.log(user.userInfo)
        })
        this.users.forEach((ele) => {
          console.log(ele.userId);
        } )
      })},2000)

    }
    catch (err) {
      console.log(err)
    }

  }

  ngOnInit(): void {
    // this.title = this.fileService.currentFile.title!;
    // console.log(this.fileService.currentFile)
    // console.log(this.fileService.idParam);
  }

  @ViewChild('menu') menu!: ElementRef;



  open() {
    this.dailog.open(OpenFileDialogComponent);
  }
  share() {
    this.dailog.open(ShareDialogComponent);
  }

  ngAfterViewInit() {
    // console.log(this.menu);
  }
  rename(){
    this.editable = true;
    let picker = document.getElementById('title') as HTMLElement;
    picker.addEventListener('keydown', (event) => {
      if(event.key == "Enter"){
        this.editable = false;
        console.log(picker.innerHTML);
        setTimeout(() => {
          this.newName = picker.innerHTML;
          // this.fileService.currentFile = {...this.fileService.currentFile, title: this.newName};
          this.store.dispatch(FileActions.updateFile({fileId: this.fileService.idParam!, file: {...this.fileService.currentFile, title: this.newName}}))
        },2000)
    }})
    
  }

  menuItemText: string[] = [
    'Open',
    'Save',
    'Exit',
    'Cut',
    'Copy',
    'Paste',
    'Toolbar',
    'Sidebar',
    'Full Screen',
    'Spelling & Grammar',
    'Customize',
    'Options',
  ];

  ngOnDestroy() :void{
    let index = this.users.findIndex((res) => res.userId == this.user.userId)
    if(index == 1){
      this.users.splice(index,1);
    }
    console.log(this.users);
    this.leave(this.fileService.idParam!, this.user);
    // this.socket.disconnect();
    this.watchRoom.unsubscribe();
    console.log(this.users);
  }

  menuItems: MenuItemModel[] | any = [
    {
      text: 'File',
      items: [
        { text: 'Open', },
        { text: 'Save', },
        { text: 'Exit', },

      ],
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
      ],
    },
    {
      text: 'View',
      items: [
        { text: 'Toolbar' },
        { text: 'Sidebar' },
        { text: 'Full Screen' },
      ],
    },
    {
      text: 'Tools',
      items: [
        { text: 'Spelling & Grammar' },
        { text: 'Customize' },
        { text: 'Options' },
      ],
    },
  ];


  openN(args: MenuEventArgs) {
    let temp = this.menuItemText.find((item) => item == args.item.text);
    if (temp == 'Open') {
      this.open();
    }
    else if(temp == 'Save'){
      this.fileService.exportFile(this.fileService.spreadsheet, this.fileService.currentFile.data.jsonObject, this.fileService.currentFile.title);
    }
  }



  // I cancel the editing of the value.
  public cancel(): void {

    this.isEditing = false;

  }


  // I enable the editing of the value.
  public edit(): void {

    this.pendingValue = this.title;
    this.isEditing = true;

  }

  // I process changes to the pending value.
  public processChanges(): void {

    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.title) {

      this.valueChangeEvents.emit(this.pendingValue);

    }

    this.isEditing = false;

  }

  join(fileId: string, user: User){
    let payload = {
      fileId: fileId,
      user: user
    }
    // console.log('join' + payload.fileId);
    this.socket.emit('joinRoom', payload);
  }

  leave(fileId: string, user: User){
    let payload = {
      fileId: fileId,
      user: user
    }
    // console.log('leave', fileId);
    this.socket.emit('leaveRoom', payload);
  }

  watchRoomChange() {
    return new Observable((observer) => {
      this.socket.on('join', (data: any) => {
        observer.next(data);
      })
    })
  }

  updateUrl(src: any) {
    (src.target as HTMLImageElement).src = "data:image/png;base64,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"

  }

}
