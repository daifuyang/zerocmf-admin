const roles = [
  {
    id: 1,
    roleName: '管理员',
    permissions: 'admin',
    displayOrder: 1,
    status: 'active',
    createTime: '2023-01-10 09:30:00',
  },
  {
    id: 2,
    roleName: '编辑',
    permissions: 'editor',
    displayOrder: 2,
    status: 'active',
    createTime: '2023-01-11 10:15:00',
  },
  {
    id: 3,
    roleName: '客服',
    permissions: 'customer_service',
    displayOrder: 3,
    status: 'active',
    createTime: '2023-01-12 15:20:00',
  },
  {
    id: 4,
    roleName: '财务',
    permissions: 'finance',
    displayOrder: 4,
    status: 'disabled',
    createTime: '2023-01-13 11:45:00',
  },
  {
    id: 5,
    roleName: '仓库管理员',
    permissions: 'warehouse_manager',
    displayOrder: 5,
    status: 'active',
    createTime: '2023-01-14 14:50:00',
  },
];

export default {
  'GET /api/v1/user/roles': (req: any, res: any) => {
    res.json({
      code: 1,
      data: {
        current: 1,
        pageSize: 10,
        data: roles,
        total: roles.length,
      },
      msg: '登录成功！',
    });
  },
};
