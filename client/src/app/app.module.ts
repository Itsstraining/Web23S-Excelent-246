import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../app/env/environment';
// syncfusion module
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

// ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from 'src/ngrx/reducers/auth.reducers';
import { AuthEffects } from 'src/ngrx/effects/auth.effects';
import { FileReducer } from 'src/ngrx/reducers/file.reducers';
import { FileEffects } from 'src/ngrx/effects/file.effects';
import { InvitationEffect } from 'src/ngrx/effects/invitation.effect';
import { InvitationReducer } from 'src/ngrx/reducers/invitation.reducer';
import { MatIconModule } from '@angular/material/icon';

// SocketIO
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://excelent-k32n4ohtya-uc.a.run.app/', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MenuModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),

    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot({
      auth: AuthReducer,
      file: FileReducer,
      invite: InvitationReducer,
    }),
    EffectsModule.forRoot([AuthEffects,
      FileEffects,
      InvitationEffect]),
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
