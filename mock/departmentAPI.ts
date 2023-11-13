const data = [
  {
    title: 'zerocmf集团',
    key: '0-0',
    children: [
      {
        title: '上海总部',
        key: '0-0-0',
        children: [
          {
            title: '人事部',
            key: '0-0-0-0',
          },
          {
            title: '财务部',
            key: '0-0-0-1',
          },
          {
            title: '市场部',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '北京分公司',
        key: '0-0-1',
        children: [
          {
            title: '销售部',
            key: '0-0-1-0',
          },
          {
            title: '技术部',
            key: '0-0-1-1',
          },
        ],
      },
      {
        title: '深圳分公司',
        key: '0-0-2',
        children: [
          {
            title: '采购部',
            key: '0-0-2-0',
          },
          {
            title: '客服部',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export default {
  'GET /api/v1/user/departments': (req: any, res: any) => {
    res.json({
      code: 1,
      data,
      msg: '获取成功！',
    });
  },
};
