import { provideRouter, RouterConfig } from '@angular/router';

/* PAGES */
  // Auth Guard
  import { GuardAuth } from './guard.auth.ts';

  // Dashboard
  import Dashboard from '../pages/dashboard/dashboard.ts'

  // Account
  import Login from '../pages/account/login.ts'
  import Account from '../pages/account/account.ts'

  // Error
  import ErrorPage from '../pages/error/error.ts'

  // Course
  import { courseRoutes } from './course.routes.ts';
  import { CourseGuardRecord } from './course.guard.record.ts';

  // Course List
  import CourseList from '../pages/courselist/courselist.ts';

  // Explore
  import Explore from '../pages/explore/explore.ts';

  // Static
  import Privacy from '../pages/static/privacy.ts';
  import Terms from '../pages/static/terms.ts';

/* ROUTES */
const routes : RouterConfig = [
  ...courseRoutes,
  { path: '', component: Dashboard },
  { path: 'account', canActivate: [ GuardAuth ], component: Account },
  { path: 'account/:userid', canActivate: [ GuardAuth ], component: Account },
  { path: 'login', component: Login },
  { path: 'terms', component: Terms },
  { path: 'privacy', component: Privacy },
  { path: 'explore', component: Explore },
  { path: 'courses', component: CourseList },
  { path: 'error/:code', component: ErrorPage },
  { path: '**', component: ErrorPage }
]

export const ROUTE_PROVIDERS = [
  provideRouter(routes),
  GuardAuth,
  CourseGuardRecord
];
