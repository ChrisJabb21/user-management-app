import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';


const TOKEN_HEADER_KEY = 'x-access-token';
/**
 * Authorization HTTP interceptor to inspect authorization requests  
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }

    /**
     * Check and transform HTTP requests for user authorization before sent to the server.
     * @param req HTTP Request object sent by client
     * @param next The next HTTPhandler interceptor object in the chain of interceptors
     * 
     * @returns outgoing authorization request  into a stream of HTTPevents and eventually a repsonse.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) })
        }
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];