import {Component, OnInit} from '@angular/core';
import {OAuthErrorEvent, OAuthService, OAuthSuccessEvent} from "angular-oauth2-oidc";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthSuccessEvent) {
        if(event.type === 'token_received') {
          console.log(`hasValidAccessToken = ${this.oauthService.hasValidAccessToken()}`);
          this.isLoggedIn = this.oauthService.hasValidIdToken();
          let identityClaims: any = this.oauthService.getIdentityClaims();
          this.username = identityClaims['preferred_username'];
        }
      }
    });
  }

  // get username(): any {
  //   let identityClaims: any = this.oauthService.getIdentityClaims();
  //   if(identityClaims) {
  //     return identityClaims['preferred_username']
  //   }
  //   return null;
  // }

  // get isLoggedIn(): boolean {
  //   return this.oauthService.hasValidIdToken()
  // }

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
