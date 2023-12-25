import { addPost, getPost, updatePost } from '@/services/post';
import { DataState } from '@/typing';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';

export default forwardRef((props: any, ref) => {
  const { onFinish: onOk } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useImmer<DataState>({
    title: '添加',
    id: undefined,
  });

  const [form] = Form.useForm();

  const fetchPost = async (id: number) => {
    const res = await getPost(id);
    if (res.code === 1) {
      form.setFieldsValue(res.data);
    }
  };

  useImperativeHandle(ref, () => ({
    open(_data: DataState) {
      if (_data?.id) {
        fetchPost(_data?.id);
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
          res = await updatePost(id, {
            ...values,
          });
        } else {
          res = await addPost({
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
      <ProFormText
        name="postName"
        label="岗位名称"
        placeholder="请输入岗位名称"
        rules={[{ required: true, message: '岗位名称不能为空！' }]}
      />

      <ProFormText
        name="postCode"
        label="岗位编码"
        placeholder="请输入岗位编码"
        rules={[{ required: true, message: '岗位编码不能为空！' }]}
      />

      <ProFormDigit
        label="岗位顺序"
        name="listOrder"
        min={0}
        fieldProps={{ precision: 0 }}
      />

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
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注内容"
      />
    </ModalForm>
  );
});
