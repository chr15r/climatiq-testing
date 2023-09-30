import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const climatiqAPIToken = 'HAYQA3CJYPMQ46MVEY1VFBEN9VQP';
    const header = { Authorization: `Bearer ${climatiqAPIToken}` };
    req = req.clone({ setHeaders: header });
    return next.handle(req);
  }
}
