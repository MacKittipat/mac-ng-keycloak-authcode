import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
  }

  username(): any {
    let identityClaims: any = this.oauthService.getIdentityClaims();
    if(identityClaims) {
      return identityClaims['preferred_username']
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken()
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  printToken(): void {
    console.log(`idToken = ${this.oauthService.getIdToken()}`);
    console.log(`idTokenExpiration = ${this.oauthService.getIdTokenExpiration()}`);
    console.log(`hasValidIdToken = ${this.oauthService.hasValidIdToken()}`);
    console.log(`claim = ${this.oauthService.getIdentityClaims()}`);
  }

}
