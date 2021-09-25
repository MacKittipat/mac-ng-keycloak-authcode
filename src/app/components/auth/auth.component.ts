import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {from, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
  }

  username(): any {
    console.log('>>>')
    let identityClaims: any = this.oauthService.getIdentityClaims();
    if(identityClaims) {
      return identityClaims['preferred_username']
    }
    return null;
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
    // this.oauthService.revokeTokenAndLogout();
  }

  printToken(): void {
    console.log(`idToken = ${this.oauthService.getIdToken()}`);
    console.log(`idTokenExpiration = ${this.oauthService.getIdTokenExpiration()}`);
    console.log(`hasValidIdToken = ${this.oauthService.hasValidIdToken()}`);
    console.log(`claim = ${this.oauthService.getIdentityClaims()}`);
  }

}
