import React from 'react';
import { Badge } from 'antd';

export const statusColumn: any = {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  valueType: 'select',
  fieldProps: {
    options: [
      {
        label: '启用',
        value: 1,
      },
      {
        label: '停用',
        value: 0,
      },
    ],
  },
  render: (text: any, record: any & { status: 0 | 1 }) => {
    return (
      <Badge status={record.status === 1 ? 'success' : 'error'} text={text} />
    );
  },
};
