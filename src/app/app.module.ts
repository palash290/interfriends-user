import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgCircleProgressModule } from 'ng-circle-progress';


// firebase
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './service/messaging.service';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    GoogleMapsModule,
    NgxImageZoomModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
