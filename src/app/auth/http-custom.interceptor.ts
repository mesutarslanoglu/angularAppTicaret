import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, tap } from 'rxjs';

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            retry(1),
            catchError(err => {
                throw 'Unauthorized user!!';
            }),
            tap((response: HttpEvent<any>) => this.checkErrorMessage(response)),
        )
    }

    private checkErrorMessage(response: HttpEvent<any>) {

    }
}