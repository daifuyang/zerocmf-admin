import { PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Space, message } from 'antd';

const Menu = () => {
  const confirmDelete = () => {
    message.success('Click on Yes');
  };

  type menuItem = {
    id: number;
    name: string;
    icon: string;
    order: number;
    access: string;
    component: string;
    status: boolean;
    createTime: string;
    children?: menuItem[];
  };

  const columns: ProColumns<menuItem>[] = [
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'icon',
    },
    {
      title: '排序',
      key: 'order',
      dataIndex: 'order',
    },
    {
      title: '权限标识',
      key: 'access',
      dataIndex: 'access',
    },
    {
      title: '组件路径',
      key: 'component',
      dataIndex: 'component',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      width: 180,
      valueType: 'option',
      key: 'option',
      render: () => (
        <Space split={<Divider type="vertical" />}>
          <a key="editable" onClick={() => {}}>
            修改
          </a>

          <a key="add" onClick={() => {}}>
            新增
          </a>

          <Popconfirm
            key="delete"
            title="您确定删除吗?"
            onConfirm={confirmDelete}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: '#ff4d4f' }} key="delete">
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const menuData: menuItem[] = [
    {
      id: 1,
      name: '首页',
      icon: 'home',
      order: 1,
      access: 'dashboard',
      component: './Dashboard',
      status: true,
      createTime: '2023-10-08',
    },
    {
      id: 2,
      name: '系统管理',
      icon: 'settings',
      order: 2,
      access: 'system',
      component: './System',
      status: true,
      createTime: '2023-10-08',
      children: [
        {
          id: 3,
          name: '用户管理',
          icon: 'user',
          order: 1,
          access: 'user',
          component: './User',
          status: true,
          createTime: '2023-10-08',
        },
        {
          id: 4,
          name: '角色管理',
          icon: 'user-group',
          order: 2,
          access: 'role',
          component: './Role',
          status: true,
          createTime: '2023-10-08',
        },
        {
          id: 5,
          name: '菜单管理',
          icon: 'menu',
          order: 3,
          access: 'menu',
          component: './Menu',
          status: true,
          createTime: '2023-10-08',
        },
      ],
    },
    {
      id: 6,
      name: '系统监控',
      icon: 'monitor',
      order: 3,
      access: 'monitor',
      component: './Monitor',
      status: true,
      createTime: '2023-10-08',
      children: [
        {
          id: 7,
          name: '在线用户',
          icon: 'user-online',
          order: 1,
          access: 'online',
          component: './Online',
          status: true,
          createTime: '2023-10-08',
        },
        {
          id: 8,
          name: '定时任务',
          icon: 'clock',
          order: 2,
          access: 'job',
          component: './Job',
          status: true,
          createTime: '2023-10-08',
        },
      ],
    },
  ];
  return (
    <ProTable<menuItem>
      columns={columns}
      cardBordered
      rowKey="id"
      dateFormatter="string"
      headerTitle="菜单列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {}}
          type="primary"
        >
          新建
        </Button>,
      ]}
      dataSource={menuData}
    />
  );
};

export default Menu;
