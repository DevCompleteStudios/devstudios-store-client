import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { inject } from "@angular/core";



export function handleAuthInterceptor( req: HttpRequest<unknown>, next:HttpHandlerFn ): Observable<HttpEvent<unknown>>{
    const authService = inject(AuthService)
    const router = inject(Router);

    return next(req)
        .pipe(
            catchError( (error) => {
                if( error.error && error.error.status && error,error.status = 401 ){
                    authService.logout();
                    alert("Session expired");
                    router.navigate(["/auth/login"]);
                }
                return of();
            })
        )    
}


