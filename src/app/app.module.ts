import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CcDialogComponent } from './cc-dialog/cc-dialog.component';
import { ModalService } from './cc-dialog/modal.service';

@NgModule({
  declarations: [	
    AppComponent,
      CcDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
