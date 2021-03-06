import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CropperModule} from "../cropper/cropper.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
