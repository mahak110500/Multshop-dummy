import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

// export class AuthGuard implements CanActivate{

//     constructor(private authService:AuthService){}

//     // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | 
//     // UrlTree> | Promise<boolean | UrlTree> {
//     //    return this.authService. 
//     // }
// }