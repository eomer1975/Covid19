import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RouterActivatorService {

  constructor() {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
      console.info(route);
      return true;
  }

}

