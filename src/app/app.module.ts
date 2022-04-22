import { HttpInterceptorService } from './http-interceptor.service';
import { appRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GamesService } from './games.service';
import { UsersService } from './users.service';
import { RegistrationService } from './registration.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { PrevArrowDirective } from './prev-arrow.directive';
import { NextArrowDirective } from './next-arrow.directive';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { HorrorComponent } from './horror/horror.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { SliceoflifeComponent } from './sliceoflife/sliceoflife.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
@NgModule({
  declarations: [
    AppComponent,
    PrevArrowDirective,
    NextArrowDirective,
    HomeComponent,
    ContentComponent,
    HorrorComponent,
    PuzzleComponent,
    SliceoflifeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    appRoutingModule

  ],
  providers: [
    GamesService,
    UsersService,
    RegistrationService, 
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
