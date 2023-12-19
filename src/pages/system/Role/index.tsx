import { deleteRole, getRoles } from '@/services/role';
import { SaveAction } from '@/typing';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import SaveModal from './saveModal';

const statusEnum:any = {
  enable: 1,
  disabled: 0,
}

type RoleItem = {
  id: number;
  roleName: string;
  permissions: string;
  listOrder: number;
  status: 0 | 1;
  createTime: string;
  remark: string;
  menuIds: number[];
};

const Role = () => {
  const tableRef = useRef<any>();
  const modalRef = useRef<SaveAction>(null);

  const confirmDelete = async (id: number) => {
    const res = await deleteRole(id);
    if (res.code === 1) {
      message.success(res.msg);
      tableRef.current.reload();
      return;
    }
    message.error(res.msg);
  };

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
      key: 'roleId',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '显示顺序',
      dataIndex: 'listOrder',
      key: 'listOrder',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        "enable": {
          text: '启用',
          status: 'Success',
        },
        "disabled": {
          text: '禁用',
          status: 'Process',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 120,
      valueType: 'option',
      key: 'option',
      render: (_, record: any) => [
        <a
          key="editable"
          onClick={() => {
            modalRef.current?.open({
              title: '修改角色',
              id: record.roleId,
            });
          }}
        >
          修改
        </a>,
        <Divider key="divider" type="vertical" />,
        <Popconfirm
          key="delete"
          title="您确定删除吗?"
          onConfirm={() => {
            confirmDelete(record.roleId);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a style={{ color: '#ff4d4f' }} key="delete">
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <SaveModal
        ref={modalRef}
        onFinish={() => {
          tableRef.current.reload();
        }}
      />

      <ProTable<RoleItem>
        columns={columns}
        actionRef={tableRef}
        cardBordered
        request={async (params = {}) => {

          params.status = statusEnum[params.status]

          const res = await getRoles(params);
          if (res.code === 1) {
            return {
              success: true,
              data: res.data.data,
              msg: res.msg,
            };
          }
          return {
            success: false,
            data: [],
            msg: res.msg,
          };
        }}
        rowKey="roleId"
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              modalRef.current?.open({
                title: '添加角色',
              });
            }}
            type="primary"
          >
            新建
          </Button>,
          <Button key="export" icon={<ExportOutlined />} onClick={() => {}}>
            导出
          </Button>,
        ]}
      />
    </>
  );
};

export default Role;
