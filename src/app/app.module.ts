import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxImageZoomModule } from 'ngx-image-zoom';


// firebase
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({ declarations: [
        AppComponent
    ],
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
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
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
