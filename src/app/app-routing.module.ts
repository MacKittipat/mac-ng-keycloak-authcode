import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UserComponent} from "./pages/user/user.component";
import {AuthGuard} from "./guards/auth.guard";
import {CallapiComponent} from "./pages/callapi/callapi.component";
import {LogoutComponent} from "./pages/logout/logout.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'callapi', component: CallapiComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
