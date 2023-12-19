import { getMenus } from '@/services/menu';
import { addRole, getRole, updateRole } from '@/services/role';
import { DataState } from '@/typing';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, Tree, message } from 'antd';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';

export default forwardRef((props: any, ref) => {
  const { onFinish: onOk } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useImmer<DataState>({
    title: '添加',
    id: undefined,
  });
  const [menuData, setMenuData] = useState([]);
  const [menuIds, setMenuIds] = useState([]);
  const [form] = Form.useForm();

  const fetchRole = async (id: number) => {
    const res = await getRole(id);
    if (res.code === 1) {
      form.setFieldsValue(res.data);
      if (res.data?.menuIds) {
        setMenuIds(res.data.menuIds);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    open(_data: DataState) {
      if (_data?.id) {
        fetchRole(_data?.id);
      }

      setData(_data);
      setOpen(true);
    },
  }));

  const onCheck = (checkedKeys: any, info) => {
    setMenuIds(checkedKeys);
  };

  const fetchMenus = async () => {
    const res = await getMenus();
    if (res.code === 1) {
      setMenuData(res.data);
      return;
    }
    message.error(res.msg);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

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
          res = await updateRole(id, {
            ...values,
            menuIds,
          });
        } else {
          res = await addRole({
            ...values,
            menuIds,
          });
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
          }
          setMenuIds([])
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
        onCancel: () => {
          setMenuIds([]);
        },
      }}
    >
      <ProFormText
        name="roleName"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[{ required: true, message: '角色名称不能为空！' }]}
      />

      <ProFormDigit
        label="角色顺序"
        name="listOrder"
        min={0}
        fieldProps={{ precision: 0 }}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
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
      <ProForm.Item label="菜单权限">
        <ProCard bordered ghost style={{ padding: 8 }}>
          <Tree
            checkable
            blockNode
            checkedKeys={menuIds}
            selectable={false}
            // defaultExpandAll
            onCheck={onCheck}
            treeData={menuData}
            fieldNames={{
              title: 'menuName',
              key: 'menuId',
              children: 'children',
            }}
          />
        </ProCard>
      </ProForm.Item>
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注内容"
      />
    </ModalForm>
  );
});
