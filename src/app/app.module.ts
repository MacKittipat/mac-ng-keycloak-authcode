import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {UserComponent} from './pages/user/user.component';
import {AuthComponent} from './components/auth/auth.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthConfig, OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {MenuComponent} from './components/menu/menu.component';
import {CallapiComponent} from './pages/callapi/callapi.component';
import {LogoutComponent} from "./pages/logout/logout.component";

function initializeApp(oauthService: OAuthService) {
  return () => {
    const authConfig: AuthConfig = {
      issuer: 'http://localhost:8080/auth/realms/mac-keycloak',
      redirectUri: 'http://localhost:4200',
      clientId: 'mac-authcode-pkce-sample',
      scope: 'openid profile email offline_access',
      responseType: 'code',
      showDebugInformation: true
    }
    oauthService.configure(authConfig);
    oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AuthComponent,
    MenuComponent,
    CallapiComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [OAuthService],
      useFactory: initializeApp
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
