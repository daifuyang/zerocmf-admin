import { GridContent } from '@ant-design/pro-components';
import { Card, Col, List, Row, Typography } from 'antd';

const Dashboard = () => {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="系统信息">
            <Typography.Title level={5}>
              当前正在使用 ZeroCMF 0.0.1
            </Typography.Title>
            <Typography.Text>
              当前使用的是最新版本，我们昼夜守护系统的安全。
            </Typography.Text>
          </Card>
        </Col>
        <Col span={24}>
          <Card title=" 服务器信息">
            <List
              dataSource={data}
              renderItem={(item: any) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Dashboard;
