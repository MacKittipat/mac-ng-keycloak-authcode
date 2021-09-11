import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {from} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/mac-keycloak',
    redirectUri: 'http://localhost:4200',
    clientId: 'mac-authcode-pkce-sample',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    showDebugInformation: true
  }

  isUserLoggedIn: boolean = false;
  claim: any;

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oauthService.configure(this.authConfig);
    from(this.oauthService.loadDiscoveryDocumentAndTryLogin()).subscribe(() => {
      if (this.oauthService.hasValidIdToken()) {
        this.isUserLoggedIn = true;
        this.claim = this.oauthService.getIdentityClaims();
        console.log(this.claim['preferred_username']);
      }
      this.printToken();
    })
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    // this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
  }

  printToken(): void {
    console.log(`idToken = ${this.oauthService.getIdToken()}`);
    console.log(`idTokenExpiration = ${this.oauthService.getIdTokenExpiration()}`);
    console.log(`hasValidIdToken = ${this.oauthService.hasValidIdToken()}`);
    console.log(`claim = ${this.oauthService.getIdentityClaims()}`);
  }

}
