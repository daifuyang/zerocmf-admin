import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { GridContent, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Col, Popconfirm, Row, Space, Switch, message } from 'antd';

import { getSystemUsers } from '@/services/user';
import Organization from './components/organization';

import { useRef } from 'react';
import ModalSave, { SaveAction } from './Save';

// const valueEnum = {
//   '': 'all',
//   0: 'enabled',
//   1: 'disabled',
// };

function User() {
  const modalRef = useRef<SaveAction>(null);

  const confirmDelete = () => {
    message.success('Click on Yes');
  };

  type systemUserItem = {
    id: number;
    account: string;
    name: string;
    email: string;
    createTime: string;
    lastLogin: string;
    isEnabled: boolean;
  };

  const columns: ProColumns<systemUserItem>[] = [
    {
      title: '账号',
      dataIndex: 'loginName',
      key: 'loginName',
      order: 5,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      order: 4,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      order: 3,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      valueType: 'dateRange',
      hideInTable: true,
      order: 1,
    },
    {
      title: '最后登录',
      dataIndex: 'loginedAt',
      key: 'loginedAt',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      order: 2,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        enabled: { text: '启用', status: 'Success' },
        disabled: { text: '停用', status: 'Error' },
      },
      render: (isEnabled: any) => <span>{<Switch checked={isEnabled} />}</span>,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [
        <a key="editable" onClick={() => {}}>
          修改
        </a>,
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
        </Popconfirm>,
      ],
    },
  ];

  return (
    <GridContent>
      <ModalSave ref={modalRef} />
      <Row gutter={[24, 24]}>
        <Col span={24} md={6}>
          <Organization />
        </Col>
        <Col span={24} md={18}>
          <ProTable<systemUserItem>
            columns={columns}
            rowSelection={{
              // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
              // 注释该行则默认不显示下拉选项
              //   selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
              defaultSelectedRowKeys: [],
            }}
            tableAlertRender={({
              selectedRowKeys,
              //   selectedRows,
              onCleanSelected,
            }) => {
              return (
                <Space size={24}>
                  <span>
                    已选 {selectedRowKeys.length} 项
                    <a
                      style={{ marginInlineStart: 8 }}
                      onClick={onCleanSelected}
                    >
                      取消选择
                    </a>
                  </span>
                </Space>
              );
            }}
            tableAlertOptionRender={() => {
              return (
                <Space size={16}>
                  <a style={{ color: '#ff4d4f' }}>批量删除</a>
                </Space>
              );
            }}
            cardBordered
            request={async (params = {}) => {
              const res = await getSystemUsers(params);
              if (res.code === 1) {
                return await {
                  success: true,
                  data: res.data.data,
                  msg: res.msg,
                };
              }

              return await {
                success: false,
                data: [],
                msg: res.msg,
              };
            }}
            rowKey="id"
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
              syncToUrl: (values, type) => {
                if (type === 'get') {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="管理员列表"
            toolBarRender={() => [
              <Button
                key="add"
                icon={<PlusOutlined />}
                onClick={() => {
                  modalRef.current?.open({
                    title: '添加用户',
                  });
                }}
                type="primary"
              >
                新建
              </Button>,
              <Button key="import" icon={<ImportOutlined />} onClick={() => {}}>
                导入
              </Button>,
              <Button key="export" icon={<ExportOutlined />} onClick={() => {}}>
                导出
              </Button>,
            ]}
          />
        </Col>
      </Row>
    </GridContent>
  );
}

export default User;
