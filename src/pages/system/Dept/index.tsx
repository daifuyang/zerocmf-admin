import { deleteDepartment, getDepartments } from '@/services/department';
import { SaveAction } from '@/typing';
import { statusColumn } from '@/utils/table';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, message } from 'antd';
import { useRef, useState } from 'react';
import SaveModal from './saveModal';

type DeptItem = {
  deptId: number;
};

const Dept = () => {
  const tableRef = useRef<any>();
  const modalRef = useRef<SaveAction>(null);
  
  const confirmDelete = async (id: number) => {
    const res = await deleteDepartment(id);
    if (res.code === 1) {
      message.success(res.msg);
      tableRef.current.reload();
      return;
    }
    message.error(res.msg);
  };

  const columns: ProColumns<DeptItem>[] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '排序',
      dataIndex: 'listOrder',
      key: 'listOrder',
      hideInSearch: true,
    },
    statusColumn,
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
              title: '修改部门',
              id: record.deptId,
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
            confirmDelete(record.deptId);
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

      <ProTable<DeptItem>
        columns={columns}
        actionRef={tableRef}
        cardBordered
        request={async (params: any = {}) => {
          const res = await getDepartments(params);
          if (res.code === 1) {
            const { data = [] } = res;
            return {
              success: true,
              data,
              msg: res.msg,
            };
          }
          return {
            success: false,
            data: [],
            msg: res.msg,
          };
        }}
        rowKey="deptId"
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="部门列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              modalRef.current?.open({
                title: '添加部门',
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

export default Dept;
