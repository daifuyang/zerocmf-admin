import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
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
          name="name"
          label="用户昵称"
          placeholder="请输入用户昵称"
        />

        <ProFormTreeSelect
          width="md"
          name="name"
          label="归属部门"
          placeholder="请选中归属部门"
        ></ProFormTreeSelect>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="合同名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
            },
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText
        name="project"
        disabled
        label="项目名称"
        initialValue="xxxx项目"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="商务经理"
        initialValue="启途"
      />
    </ModalForm>
  );
});
