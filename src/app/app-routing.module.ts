import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BallsListComponent} from "./components/balls-list/balls-list.component";
import {AddBallComponent} from "./components/add-ball/add-ball.component";
import {BallDetailsComponent} from "./components/ball-details/ball-details.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'balls-list', component: BallsListComponent },
  { path: 'balls-list/:id', component: BallDetailsComponent },
  { path: 'add-ball', component: AddBallComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
