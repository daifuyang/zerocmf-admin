import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  TreeSelect,
  message,
  Radio,
  Switch,
  Space,
} from 'antd';
import { AssetsInput, AssetsMultInput, EditorInput } from '@zerocmf/antd-form';
import { history } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getPortalCategoryList } from '@/services/portalCategory';
import { getPortal, addPortal, updatePortal } from '@/services/portal';

import moment from 'moment';

import { getThemeFiles } from '@/services/themeFile';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const { Option } = Select;

const PostForm = ({ editId }: any) => {
  const [treeData, setTreeData] = useState([]);
  const [treeValue, setTreeValue] = useState([]);

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

    param.publish_time = param.publish_time.format(dateFormat);

    let result;
    if (editId > 0) {
      result = await updatePortal(editId, param);
    } else {
      result = await addPortal(param);
    }

    if (result.code === 1) {
      if (!editId) {
        history.push(`/portal/index/edit/${result.data.id}`);
      }
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };

  const tProps = {
    treeDefaultExpandAll: true,
    value: treeValue,
    treeData,
    multiple: true,
    treeCheckable: true,
    treeCheckStrictly: true,
    allowClear: true,
  };

  useEffect(() => {
    const featchData = async () => {
      const result = await getPortalCategoryList();
      if (result.code === 1) {
        setTreeData(result.data);
      }
    };
    featchData();

    const featchPost = async () => {
      const result = await getPortal(editId);
      if (result.code === 1) {
        const { data } = result;
        if (data.category instanceof Array) {
          const category: any = [];
          data.category.forEach((element: any) => {
            category.push({
              label: element.name,
              value: element.id.toString(),
            });
          });

          if (category.length > 0) {
            setTreeValue(category);
            data.category = category;
          }
        }

        if (data.post_keywords === '') {
          delete data.post_keywords;
        } else {
          data.post_keywords = data.keywords;
        }

        if (data.more_json && data.more_json.extends) {
          data.extends = data.more_json.extends;
        }

        if (data.more_json && data.more_json.template) {
          data.template = data.more_json.template;
        }

        if (data.publish_time) {
          data.publish_time = moment(data.publish_time, dateFormat);
        }

        form.setFieldsValue(data);
        setPost(data);
      }
    };
    featchData();

    if (editId > 0) {
      featchPost();
    }

    const init = async () => {
      const result = await getThemeFiles({ type: 'article' });
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
        name="category"
        rules={[{ required: true, message: '??????????????????!' }]}
      >
        <TreeSelect dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} {...tProps} />
      </Form.Item>

      <Form.Item
        label="??????"
        name="post_title"
        rules={[{ required: true, message: '???????????????!' }]}
      >
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

      <Form.Item label="??????" name="list_order" initialValue={10000}>
        <InputNumber />
      </Form.Item>

      <Form.Item label="????????????" name="post_source">
        <Input />
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

      <Form.Item label="??????" name="audio" getValueProps={() => ({ path: post.audio_prev_path })}>
        <AssetsInput type="audio" />
      </Form.Item>

      <Form.Item label="??????" name="video" getValueProps={() => ({ path: post.video_prev_path })}>
        <AssetsInput type="video" />
      </Form.Item>

      <Form.Item label="??????" name="is_top" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="??????" name="recommended" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="??????">
        <Form.List name="extends">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field: any) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'key']}
                    fieldKey={[field.fieldKey, 'key']}
                    rules={[{ required: true, message: 'Missing key' }]}
                  >
                    <Input placeholder="key" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'value']}
                    fieldKey={[field.fieldKey, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  ??????
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item initialValue={moment()} label="????????????" name="publish_time">
        <DatePicker format={dateFormat} showTime />
      </Form.Item>

      <Form.Item
        // rules={[{ required: true, message: '????????????????????????!' }]}
        initialValue={'article'}
        label="??????"
        name="template"
      >
        <Select placeholder="???????????????" style={{ width: 120 }}>
          {tpl.map((item: any, index: number) => (
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
