import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpreadsheetRoutingModule } from './spreadsheet-routing.module';
import { SpreadsheetComponent } from './spreadsheet.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenFileDialogComponent } from './components/open-file-dialog/open-file-dialog.component';
import { MiniFileComponent } from './components/mini-file/mini-file.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ChatComponent } from './components/chat/chat.component';
import { RenameComponent } from './components/rename/rename.component';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { SuccessComponent } from './../../components/success/success.component';


@NgModule({
  declarations: [
    SpreadsheetComponent,
    NavbarComponent,
    SheetComponent,
    OpenFileDialogComponent,
    MiniFileComponent,
    ShareDialogComponent,
    ChatComponent,
    RenameComponent,
    WarningComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    SpreadsheetRoutingModule,
    SpreadsheetAllModule,
    FormsModule,
    FileManagerModule,
    SharedModule,
  ]
})
export class SpreadsheetModule { }
