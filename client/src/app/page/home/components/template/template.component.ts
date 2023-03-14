import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import { FileService } from 'src/app/service/file.service';
import { FileActions } from 'src/ngrx/actions/file.actions';
import { AuthState } from 'src/ngrx/states/auth.states';
import { FileState } from 'src/ngrx/states/file.states';
import { User } from 'src/app/model/user.model';
import {File} from 'src/app/model/file.model'
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {
  currentUser!: User;
  user$!:Observable<AuthState>;
  file$!: Observable<FileState>;
  constructor(
    public auth: AuthService,

    protected fileService: FileService,
    private store: Store<{ auth: AuthState; file: FileState }>,
    private router: Router
  ) {
    this.user$ = this.store.select('auth');
    this.user$.subscribe((user) => {
      if(user.loading == false){
        this.currentUser = user.user!;
      }
    });
    
    this.file$ = this.store.select('file');
  }

  templates = [
    { name: 'Empty' , span: '+', value: 'true'},
    { name: 'Monthly budget' ,img: 'https://ssl.gstatic.com/docs/templates/thumbnails/1Db6sfBIFIJ45O-WxrH3_7auMPpiZ8wMc-sqCVjaLJgo_400.png', value: 'false'},
    { name: 'Annual budget' ,img: 'https://ssl.gstatic.com/docs/templates/thumbnails/1-G94ItToCkCf34aBAjD5gnJb86N5viFUeerMi-xpWdw_400.png', value: 'false'},
    { name: 'To-do list' ,img: 'https://ssl.gstatic.com/docs/templates/thumbnails/18CjGVazKR_Emu6CNy0JHCQBaQuL4RfculNG3kepFCDU_400_2.png' , value: 'false'},
    { name: 'Investment tracker' ,img: 'https://ssl.gstatic.com/docs/templates/thumbnails/1N7-yV4TzDTYO1EN14tPR8GOKsx_GpQ_ufvH9f33uQpA_400.png', value: 'false'},
    { name: 'Work schedule' ,img: 'https://ssl.gstatic.com/docs/templates/thumbnails/1lNgQBSI7GtfaRFku1w-W4rqRqf_XuYPBUbXlOwdz_BA_400.png', value: 'false'},
  ];

  startNewFile() {
    let fileToCreate: File = {
      fileId: Timestamp.now().toMillis().toString(),
      ownerId: this.currentUser.userId!,
      title: "Untitled",
      createdDate: Timestamp.now().toMillis(),
      modifiedDate: Timestamp.now().toMillis(),
      modifiedBy: '',
      createdBy: this.currentUser.userName!,
      status: "private",
      data: {
        "jsonObject": {
            "Workbook": {
                "allowInsert": true,
                "allowCellFormatting": true,
                "showFormulaBar": true,
                "allowHyperlink": true,
                "locale": "en-US",
                "selectionSettings": {
                    "mode": "Multiple"
                },
                "enableKeyboardNavigation": true,
                "filterCollection": [],
                "height": "100%",
                "sheets": [
                    {
                        "frozenRows": 0,
                        "usedRange": {
                            "rowIndex": 0,
                            "colIndex": 2
                        },
                        "index": 0,
                        "columns": [
                            {},
                            null,
                            {}
                        ],
                        "topLeftCell": "A1",
                        "selectedRange": "C1:C1",
                        "isProtected": false,
                        "rowCount": 100,
                        "state": "Visible",
                        "paneTopLeftCell": "A1",
                        "rows": [],
                        "frozenColumns": 0,
                        "activeCell": "C1",
                        "showGridLines": true,
                        "showHeaders": true,
                        "colCount": 100,
                        "protectSettings": {
                            "selectCells": false,
                            "formatRows": false,
                            "formatColumns": false,
                            "selectUnLockedCells": false,
                            "formatCells": false,
                            "insertLink": false
                        },
                        "name": "Sheet1"
                    }
                ],
                "enableRtl": false,
                "allowNumberFormatting": true,
                "sortCollection": [],
                "enablePersistence": false,
                "allowFreezePane": true,
                "allowSorting": true,
                "allowFiltering": true,
                "openUrl": "https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open",
                "showAggregate": true,
                "allowEditing": true,
                "enableContextMenu": true,
                "isProtected": false,
                "allowOpen": true,
                "allowResizing": true,
                "allowScrolling": true,
                "showRibbon": true,
                "cssClass": "",
                "autoFillSettings": {
                    "showFillOptions": true
                },
                "allowMerge": true,
                "enableClipboard": true,
                "allowWrap": true,
                "showSheetTabs": true,
                "allowSave": true,
                "cellStyle": {
                    "border": "",
                    "fontFamily": "Calibri",
                    "color": "#000000",
                    "fontWeight": "normal",
                    "textIndent": "0pt",
                    "textDecoration": "none",
                    "borderBottom": "",
                    "borderLeft": "",
                    "borderRight": "",
                    "borderTop": "",
                    "fontStyle": "normal",
                    "backgroundColor": "#ffffff",
                    "verticalAlign": "bottom",
                    "fontSize": "11pt",
                    "textAlign": "left"
                },
                "allowFindAndReplace": true,
                "allowImage": true,
                "scrollSettings": {
                    "enableVirtualization": true,
                    "isFinite": false
                },
                "allowChart": true,
                "allowAutoFill": true,
                "width": "100%",
                "allowDelete": true,
                "saveUrl": "https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save",
                "allowDataValidation": true,
                "enableKeyboardShortcut": true,
                "activeSheetIndex": 0,
                "allowConditionalFormat": true,
                "password": "",
                "allowUndoRedo": true,
                "definedNames": []
            }
        }
    },
      members:[],
  };

    this.fileService.currentFile = fileToCreate;
    this.store.dispatch(FileActions.createFile({ file: fileToCreate }));
    this.store.dispatch(FileActions.createFileSuccess({ file: this.fileService.currentFile }));
    
    this.router.navigate(['/spreadsheet', fileToCreate.fileId]);
    
  }
}
