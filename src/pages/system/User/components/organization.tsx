import { getDepartments } from '@/services/department';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Tree, TreeProps, message } from 'antd';
import { useEffect, useState } from 'react';

const Organization = () => {
  const [treeData, setTreeData] = useState([]);

  const fetchData = async () => {
    const res = await getDepartments();
    if (res.code === 1) {
      setTreeData(res.data);
      return;
    }
    message.error(res.msg);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 树形控件选中的回调
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onSearch = () => {};

  return (
    <div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <Input
          onChange={onSearch}
          placeholder="请输入部门名称"
          allowClear
          prefix={<SearchOutlined />}
        />
      </div>
      {treeData?.length > 0 && (
        <Tree
          style={{
            padding: '0 12px 12px 12px',
          }}
          defaultExpandAll
          onSelect={onSelect}
          blockNode
          fieldNames={{
            title: 'deptName',
            key: 'deptId',
          }}
          treeData={treeData}
        />
      )}
    </div>
  );
};

export default Organization;
