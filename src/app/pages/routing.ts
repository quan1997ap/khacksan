import { AuthGuard } from './../core/guard/auth.guard';
import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: '',
    canActivate: [AuthGuard] ,
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard] ,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'system-settings',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Tham số hệ thống', url: '/system-settings' }
      ]
    },
    loadChildren: () =>
      import('../modules/system-parameter/system-parameter.module').then((m) => m.SystemParameterModule),
  },
  {
    path: 'newes',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Quản lý tin tức', url: '/news' }
      ]
    },
    loadChildren: () => import('../modules/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'rooms',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Quản lý loại phòng', url: '/rooms' }
      ]
    },
    loadChildren: () => import('../modules/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Quản lý order', url: '/orders' }
      ]
    },
    loadChildren: () => import('../modules/order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'promotions',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Quản lý khuyến mãi', url: '/promotion' }
      ]
    },
    loadChildren: () => import('../modules/promotion/promotion.module').then((m) => m.PromotionModule),
  },
  {
    path: 'report',
    canActivate: [AuthGuard] ,
    data: {
      breadcrumb: [
        { label: 'Quản lý khuyến mãi', url: '/report' }
      ]
    },
    loadChildren: () => import('../modules/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'perm',
    canActivate: [AuthGuard] ,
    loadChildren: () =>
      import('../modules/perm/perm.module').then((m) => m.PermissionModule),
  },
  // {
  //   path: 'design-system',
  //   canActivate: [AuthGuard] ,
  //   data: {
  //     breadcrumb: [
  //       { label: 'Components' }
  //     ]
  //   },
  //   loadChildren: () => import('../modules/design-system/design-system.module').then((m) => m.DesignSystemModule),
  // },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
