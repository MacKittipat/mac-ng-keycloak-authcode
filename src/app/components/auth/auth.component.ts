import {Component, OnInit} from '@angular/core';
import {OAuthService, OAuthSuccessEvent} from "angular-oauth2-oidc";
import {filter, take} from "rxjs/operators";

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
    this.oauthService.events.pipe(
      filter(event => event instanceof OAuthSuccessEvent && this.oauthService.hasValidAccessToken()),
      take(1))
      .subscribe(event => {
        this.isLoggedIn = this.oauthService.hasValidIdToken();
        let identityClaims: any = this.oauthService.getIdentityClaims();
        this.username = identityClaims['preferred_username'];
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
