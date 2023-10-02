import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const climatiqAPIToken = Constants.CLIMATIQ_API_KEY;
    const header = { Authorization: `Bearer ${climatiqAPIToken}` };
    req = req.clone({ setHeaders: header });
    return next.handle(req);
  }
}
