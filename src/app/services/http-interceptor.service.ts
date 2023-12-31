import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { AppSecrets } from '../app.secrets';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const header = { Authorization: `Bearer ${AppSecrets.CLIMATIQ_API_KEY}` };
    req = req.clone({ setHeaders: header });
    return next.handle(req);
  }
}
