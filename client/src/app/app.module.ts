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
import { DesignerComponent } from './designer/components/designer.component';
import { MenuComponent } from './designer/components/menu/menu.component';
import { CanvasComponent } from './designer/components/canvas/canvas.component';
import { DesignItemComponent } from './designer/components/canvas/design-item/design-item.component';
import { RectangleComponent } from './designer/components/canvas/design-item/rectangle/rectangle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizeableDirective } from './designer/directives/resizeable.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GoogleAdsComponent,
    BrowseComponent,
    LoginComponent,
    RegistrationComponent,
    DesignerComponent,
    DesignItemComponent,
    MenuComponent,
    CanvasComponent,
    RectangleComponent,
    ResizeableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
