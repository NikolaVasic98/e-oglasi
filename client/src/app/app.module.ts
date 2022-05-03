import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GoogleAdsComponent } from './layout/google-ads/google-ads.component';
import { BrowseComponent } from './browse/components/browse.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RandomService } from './common/services/random.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './user/components/login/login.component';
import { RegistrationComponent } from './user/components/registration/registration.component';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GoogleAdsComponent,
    BrowseComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
