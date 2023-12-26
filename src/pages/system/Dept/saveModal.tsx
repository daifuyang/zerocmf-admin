import {
  addDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from '@/services/department';
import { DataState } from '@/typing';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';

export default forwardRef((props: any, ref) => {
  const { onFinish: onOk } = props;

  const [open, setOpen] = useState(false);
  const [depts, setDepts] = useState<any>([]);
  const [data, setData] = useImmer<DataState>({
    title: '添加',
    id: undefined,
  });

  const [form] = Form.useForm();

  const fetchDepts = async () => {
    const res = await getDepartments();
    if (res.code === 1) {
      setDepts(res.data);
    }
  };

  const fetchDept = async (id: number) => {
    const res = await getDepartment(id);
    if (res.code === 1) {
      form.setFieldsValue(res.data);
    }
  };

  useImperativeHandle(ref, () => ({
    open(_data: DataState) {
      fetchDepts();
      if (_data?.id) {
        fetchDept(_data?.id);
      }

      setData(_data);
      setOpen(true);
    },
  }));

  return (
    <ModalForm
      width={520}
      form={form}
      open={open}
      title={data?.title}
      onFinish={async (values) => {
        let res;
        const { id } = data;
        if (id) {
          res = await updateDepartment(id, {
            ...values,
          });
        } else {
          res = await addDepartment({
            ...values,
          });
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
          }
          return true;
        }
        message.error(res.msg);
        return false;
      }}
      onOpenChange={setOpen}
      modalProps={{
        className: 'zero-modal',
        centered: true,
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => {},
      }}
    >
      <ProFormText name="deptId" hidden placeholder="请输入部门名称" />

      <ProFormDependency name={['deptId', 'parentId']}>
        {({ deptId, parentId }) => {
          if (deptId > 0 && parentId === 0) {
            return null;
          }

          return (
            <ProFormTreeSelect
              name="parentId"
              label="上级部门"
              placeholder="请选择上级部门"
              fieldProps={{
                treeData: depts,
                fieldNames: {
                  label: 'deptName',
                  value: 'deptId',
                },
                onChange: (e) => {
                  console.log('e', e);
                },
              }}
            />
          );
        }}
      </ProFormDependency>

      <ProFormText
        name="deptName"
        label="部门名称"
        placeholder="请输入部门名称"
        rules={[{ required: true, message: '部门名称不能为空！' }]}
      />

      <ProFormDigit
        label="显示顺序"
        name="listOrder"
        min={0}
        fieldProps={{ precision: 0 }}
      />

      <ProFormText name="leader" label="负责人" placeholder="请输入负责人" />
      <ProFormText name="phone" label="联系电话" placeholder="请输入联系电话" />
      <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" />

      <ProFormRadio.Group
        name="status"
        label="岗位状态"
        initialValue={1}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ]}
      />
    </ModalForm>
  );
});
