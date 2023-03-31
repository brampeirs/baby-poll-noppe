import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './containers/overview/overview.component';
import { PollComponent } from './containers/poll/poll.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
  {
    path: 'poll',
    component: PollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
