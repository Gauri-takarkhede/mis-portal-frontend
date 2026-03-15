import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectivesComponent } from './electives/electives.component';
import { BonafideComponent } from './bonafide/bonafide.component';
import { QueryComponent } from './query/query.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { StudentsMngtComponent } from './faculty/pages/students-mngt/students-mngt.component';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'students',
        component: StudentsMngtComponent,
      },
      {
        path: 'electives',
        component: ElectivesComponent,
      },
      {
        path: 'bonafide',
        component: BonafideComponent,
      },
      {
        path: 'scholarship',
        component: ScholarshipComponent,
      },
      {
        path: 'query',
        component: QueryComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
