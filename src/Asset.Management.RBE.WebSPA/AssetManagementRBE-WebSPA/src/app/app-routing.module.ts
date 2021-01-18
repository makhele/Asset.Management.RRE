import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './modules/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
