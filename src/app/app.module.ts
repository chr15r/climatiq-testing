import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClimatiqEstimateComponent } from './components/climatiq-estimate/climatiq-estimate.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ClimatiqRequestService } from './services/climatiq-request.service';
import { ClimatiqSearchResponseEmissionFactorComponent } from './components/climatiq-estimate/climatiq-search-response-emission-factor/climatiq-search-response-emission-factor.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { ClimatiqApiKeyComponent } from './components/climatiq-api-key/climatiq-api-key.component';

@NgModule({
  declarations: [
    AppComponent,
    ClimatiqEstimateComponent,
    ClimatiqSearchResponseEmissionFactorComponent,
    LoaderComponent,
    ClimatiqApiKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule

  ],
  providers: [
    ClimatiqRequestService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
