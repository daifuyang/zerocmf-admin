import { addAdmin } from '@/services/admin';
import { getDepartments } from '@/services/department';
import { getPosts } from '@/services/post';
import { getRoles } from '@/services/role';
import { DataState } from '@/typing';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';
import styles from './index.less';

export default forwardRef((props: any, ref) => {
  const { onOk } = props;

  const { message } = App.useApp();

  const [form] = Form.useForm<any>();
  const [open, setOpen] = useState(false);
  const [data, setData] = useImmer<DataState>({
    title: '添加用户',
  });

  useImperativeHandle(ref, () => ({
    open(_data: DataState) {
      setData(_data);
      setOpen(true);
    },
  }));

  return (
    <ModalForm
      title={data.title}
      form={form}
      open={open}
      modalProps={{
        className: 'zero-modal',
        destroyOnClose: true,
        onCancel: () => {
          setOpen(false);
        },
      }}
      onFinish={async (values) => {
        const res = await addAdmin(values);
        if (res.code === 1) {
          message.success(res.msg);
          if (onOk) {
            onOk();
          }
          setOpen(false);
          return true;
        } else {
          message.error(res.msg);
          return false;
        }
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="userName"
          label="用户昵称"
          placeholder="请输入用户昵称"
        />

        <ProFormTreeSelect
          width="md"
          name="deptId"
          label="归属部门"
          placeholder="请选中归属部门"
          fieldProps={{
            fieldNames: {
              label: 'deptName',
              value: 'deptId',
            },
          }}
          request={async () => {
            const res = await getDepartments();
            if (res.code === 1) {
              return res.data;
            }
            return [];
          }}
        ></ProFormTreeSelect>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="phoneNumber"
          label="手机号"
          placeholder="请输入名称"
          rules={[
            {
              type: 'method',
              validator: (rule, value, callback) => {
                if (!!value) {
                  const phoneNumberRegex = /^1[3456789]\d{9}$/;
                  // 示例用法
                  if (!phoneNumberRegex.test(value)) {
                    callback('请输入正确的手机号');
                  } else {
                    callback();
                  }
                }
              },
            },
          ]}
        />
        <ProFormText
          width="md"
          label="邮箱"
          name="email"
          placeholder="请输入邮箱"
          rules={[
            {
              type: 'method',
              validator: (rule, value, callback) => {
                if (!!value) {
                  const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  // 示例用法
                  if (!emailRegex.test(value)) {
                    callback('请输入正确的邮箱  ');
                  } else {
                    callback();
                  }
                }
              },
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          label="登录账号"
          name="loginName"
          placeholder="请输入登录账号"
          rules={[
            {
              required: true,
              message: '登录账号不能为空',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="登录密码"
          placeholder="请输入登录密码"
          rules={[
            {
              type: 'method',
              validator(rule, value, callback) {
                if (value.length < 6) {
                  callback('密码长度不能小于6位');
                } else {
                  callback();
                }
              },
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="gender"
          options={[
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
            {
              label: '保密',
              value: 2,
            },
          ]}
          label="性别"
          placeholder="请选择性别"
        />
        <ProFormRadio.Group
          width="md"
          name="status"
          label="状态"
          options={[
            {
              label: '正常',
              value: 1,
            },
            {
              label: '停用',
              value: 0,
            },
          ]}
        />
      </ProForm.Group>
      <ProFormCheckbox.Group
        name="postIds"
        label="岗位"
        request={async () => {
          const res = await getPosts({ pageSize: 0 });
          if (res.code === 1) {
            return res.data?.map((item: any) => ({
              label: item.postName,
              value: item.postCode,
            }));
          }
          return [];
        }}
      />
      <ProFormCheckbox.Group
        formItemProps={{ className: styles.formItem }}
        name="roleIds"
        label="角色"
        request={async () => {
          const res = await getRoles({ pageSize: 0 });
          if (res.code === 1) {
            return res.data?.map((item: any) => ({
              label: item.roleName,
              value: item.roleId,
            }));
          }
          return [];
        }}
      />
      <ProFormTextArea
        formItemProps={{
          style: {
            width: '688px',
          },
        }}
        name="remark"
        label="备注"
      />
    </ModalForm>
  );
});
