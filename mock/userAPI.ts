const admins = [
  {
    id: 1,
    account: '用户1',
    name: '张三',
    email: 'zhangsan@example.com',
    createTime: '2023-01-10 09:30:00',
    lastLogin: '2023-01-15 14:45:00',
    isEnabled: true,
  },
  {
    id: 2,
    account: '用户2',
    name: '李四',
    email: 'lisi@example.com',
    createTime: '2023-01-11 10:15:00',
    lastLogin: '2023-01-14 11:20:00',
    isEnabled: false,
  },
  {
    id: 3,
    account: '用户3',
    name: '王五',
    email: 'wangwu@example.com',
    createTime: '2023-01-12 15:20:00',
    lastLogin: '2023-01-13 17:30:00',
    isEnabled: true,
  },
  {
    id: 4,
    account: '用户4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    createTime: '2023-01-13 11:45:00',
    lastLogin: '2023-01-16 09:10:00',
    isEnabled: true,
  },
  {
    id: 5,
    account: '用户5',
    name: '钱七',
    email: 'qianqi@example.com',
    createTime: '2023-01-14 14:50:00',
    lastLogin: '2023-01-15 16:25:00',
    isEnabled: false,
  },
];

const currentUser = {
  userId: 1,
  username: 'admin',
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  tags: [
    {
      key: '0',
      label: '很有想法的',
    },
    {
      key: '1',
      label: '专注设计',
    },
    {
      key: '2',
      label: '辣~',
    },
    {
      key: '3',
      label: '大长腿',
    },
    {
      key: '4',
      label: '川妹子',
    },
    {
      key: '5',
      label: '海纳百川',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: {
      label: '浙江省',
      key: '330000',
    },
    city: {
      label: '杭州市',
      key: '330100',
    },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
};

export default {
  'GET /api/v1/user/login': (req: any, res: any) => {
    res.json({
      code: 1,
      data: {
        token: '123',
      },
      msg: '登录成功！',
    });
  },
  'GET /api/v1/user/current': (req: any, res: any) => {
    res.json({
      code: 1,
      data: currentUser,
      msg: '获取成功！',
    });
  },
  'GET /api/v1/user/admins': (req: any, res: any) => {
    res.json({
      code: 1,
      data: {
        current: 1,
        pageSize: 10,
        data: admins,
        total: admins.length,
      },
      msg: '获取成功！',
    });
  },
};
