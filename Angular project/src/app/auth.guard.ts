import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();
  constructor(private AuthServicee: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
  const expectedRoles = route.data['expectedRole'] as string[];

  console.log(expectedRoles)
  const token = localStorage.getItem('token'); 
  if(!token){
    return false;
  }
  const decodetoken= this.helper.decodeToken(token);
  const userRoles = decodetoken.role
  const hasIntersection = expectedRoles.some(role => userRoles.includes(role));
  console.log(hasIntersection)

  if (hasIntersection) {
    return true;
  } else {
    this.router.navigate(['/accueil']);
    return false;
  }
}
}
