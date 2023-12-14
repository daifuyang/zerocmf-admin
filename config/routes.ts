export default [
  {
    path: '/user/login',
    layout: false,
    component: './user/Login',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '首页',
    path: '/dashboard',
    component: './Dashboard',
    affix: true,
  },
  {
    name: '系统管理',
    path: '/system',
    routes: [
      {
        path: '/system',
        redirect: '/system/user',
      },
      {
        name: '用户管理',
        path: '/system/user',
        component: './system/User',
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: './system/Role',
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        component: './system/Menu',
      },
      {
        name: '部门管理',
        path: '/system/dept',
        component: './system/Dept',
      },
      {
        name: '岗位管理',
        path: '/system/post',
      },
      {
        name: '通知公告',
        path: '/system/notice',
      },
      {
        name: '日志管理',
        path: '/system/log',
        routes: [
          {
            name: '操作日志',
            path: '/system/log/operate',
          },
          {
            name: '登录日志',
            path: '/system/log/login',
          },
        ],
      },
    ],
  },
  {
    name: '系统监控',
    path: '/monitor',
    routes: [
      {
        name: '在线用户',
        path: '/monitor/online',
      },
      {
        name: '定时任务',
        path: '/monitor/job',
      },
      {
        name: '服务监控',
        path: '/monitor/server',
      },
      {
        name: '缓存监控',
        path: '/monitor/cache',
      },
      {
        name: '缓存列表',
        path: '/monitor/cache_list',
      },
    ],
  },
];
