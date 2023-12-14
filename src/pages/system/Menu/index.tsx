import { getMenus } from '@/services/menu';
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
      key: 'menuName',
      dataIndex: 'menuName',
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'icon',
    },
    {
      title: '排序',
      key: 'listOrder',
      dataIndex: 'listOrder',
    },
    {
      title: '权限标识',
      key: 'perms',
      dataIndex: 'perms',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
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

  return (
    <ProTable<menuItem>
      columns={columns}
      cardBordered
      rowKey="menuId"
      request={async (params = {}) => {
        const res = await getMenus(params);
        if (res.code === 1) {
          return await {
            success: true,
            data: res.data,
            msg: res.msg,
          };
        }

        return await {
          success: false,
          data: [],
          msg: res.msg,
        };
      }}
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
    />
  );
};

export default Menu;
