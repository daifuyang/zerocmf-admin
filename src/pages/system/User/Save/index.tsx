import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

interface DataState {
  title: string;
}

// 暴露弹窗的行为
export interface SaveAction {
  open: (_data: DataState) => void;
}

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useImmer<DataState>({
    title: '添加用户',
  });
  const [form] = Form.useForm<{ name: string; company: string }>();

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
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
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
        ></ProFormTreeSelect>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="phoneNumber"
          label="手机号"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          label="邮箱"
          name="email"
          placeholder="请输入邮箱"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          label="登录账号"
          name="loginName"
          placeholder="请输入登录账号"
        />
        <ProFormText.Password
          width="md"
          name="密码"
          label="登录密码"
          placeholder="请输入登录密码"
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
        options={['农业', '制造业', '互联网','123','1234','1236']}
      />
      <ProFormCheckbox.Group
        name="roleIds"
        label="角色"
        options={['农业', '制造业', '互联网']}
      />
      <ProFormTextArea formItemProps={{
        style: {
          width: '688px'
        }
      }} name="remark" label="备注" />
    </ModalForm>
  );
});
