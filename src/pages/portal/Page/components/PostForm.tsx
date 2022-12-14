import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Radio } from 'antd';
import { AssetsInput, AssetsMultInput, EditorInput } from '@zerocmf/antd-form';
import { history } from 'umi';
import { getPortal, addPortal, updatePortal } from '@/services/portal';

import { getThemeFiles } from '@/services/themeFile';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const PostForm = ({ editId }: any) => {
  const [form] = Form.useForm();

  const [post, setPost] = useState<any>([]);

  const [tpl, setTpl] = useState([]);

  const onFinish = async (data: any) => {
    const param = { ...data };
    const { category } = param;
    const categoryIds: any = [];
    if (category !== undefined) {
      category.forEach((element: any) => {
        categoryIds.push(element.value);
      });
    }
    param.category_ids = categoryIds;
    param.is_top = param.is_top ? 1 : 0;
    param.recommended = param.recommended ? 1 : 0;
    param.post_type = 2;
    let result;
    if (editId > 0) {
      result = await updatePortal(editId, param);
    } else {
      result = await addPortal(param);
    }
    if (result.code === 1) {
      if (!editId) {
        history.push(`/portal/page/edit/${result.data.id}`);
      }
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };

  useEffect(() => {
    const featchPost = async () => {
      const result = await getPortal(editId);
      if (result.code === 1) {
        const { data } = result;
        if (data.category instanceof Array) {
          const category = [];
          data.category.forEach((element: any) => {
            category.push({
              label: element.name,
              value: element.id.toString(),
            });
          });
        }
        if (data.post_keywords === '') {
          delete data.post_keywords;
        } else {
          data.post_keywords = data.keywords;
        }

        if (data.more_json && data.more_json.template) {
          data.template = data.more_json.template;
        }

        form.setFieldsValue(data);
        setPost(data);
      }
    };

    if (editId > 0) {
      featchPost();
    }

    const init = async () => {
      const result = await getThemeFiles({ theme: THEME, type: 'page' });

      if (result.code === 1) {
        setTpl(result.data);
      }
    };

    init();
  }, [editId]);

  return (
    <Form form={form} style={{ maxWidth: '800px' }} {...layout} onFinish={onFinish}>
      <Form.Item
        label="??????"
        name="post_title"
        rules={[{ required: true, message: '???????????????!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="??????" name="alias">
        <Input />
      </Form.Item>

      <Form.Item
        label="?????????"
        name="thumbnail"
        getValueProps={() => ({ path: post.thumb_prev_path })}
      >
        <AssetsInput />
      </Form.Item>

      <Form.Item label="?????????" name="post_keywords">
        <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
      </Form.Item>

      <Form.Item label="??????" name="post_excerpt">
        <Input />
      </Form.Item>

      <Form.Item label="?????????-??????" name="seo_title">
        <Input />
      </Form.Item>

      <Form.Item label="?????????-?????????" name="seo_keywords">
        <Input />
      </Form.Item>

      <Form.Item label="?????????-??????" name="seo_description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="??????" name="post_content">
        <EditorInput />
      </Form.Item>

      <Form.Item label="??????" name="photos">
        <AssetsMultInput type="image" />
      </Form.Item>

      <Form.Item label="??????" name="files">
        <AssetsMultInput type="file" />
      </Form.Item>

      <Form.Item label="??????" name="template" initialValue={'default'}>
        <Select placeholder="???????????????" style={{ width: 120 }}>
          {tpl.map((item: any, index) => (
            <Option key={index} value={item.file}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="??????" name="post_status" initialValue={1}>
        <Radio.Group>
          <Radio value={0}>??????</Radio>
          <Radio value={1}>??????</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button style={{ marginRight: '8px' }} type="primary" htmlType="submit">
          ??????
        </Button>

        <Button onClick={() => history.goBack()}>??????</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
