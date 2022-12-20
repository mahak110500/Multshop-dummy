import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient){}

    signUp(email:string, password:string ){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmKk9u8veuFAy8CaFlnYhZAJJUd3QybCg',
            {
                email: email,
                password: password,
                returnSecuredToken:true
            }
        )
        .pipe(
            catchError(this.handleErrors)
        );
    }


    login(email:string, password:string){
       return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmKk9u8veuFAy8CaFlnYhZAJJUd3QybCg',
            {
                email: email,
                password: password,
                returnSecuredToken:true
            }
        )
        .pipe(
            catchError(this.handleErrors)
        );
    }


    private handleErrors(errorRes:HttpErrorResponse){
        let errorMessage = 'An unknown error occured';

        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;

            case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists';
            break;

            case 'INVALID_PASSWORD':
            errorMessage = 'This email already exists';
            break;

        }
        return throwError(errorMessage);
    }

}