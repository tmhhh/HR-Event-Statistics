import { ClearOutlined } from "@ant-design/icons";
import { Button, Table, Typography } from "antd";
import "./App.css";
const { Title, Text } = Typography;
function App() {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Press count",
      dataIndex: "pressCount",
      key: "pressCount",
      render: (text) => <Text>{text}</Text>,
    },

    {
      title: "Action",
      key: "actions",
      dataIndex: "actions",
      render: (id) => (
        <Button type="primary" icon={<ClearOutlined />} size={30}>
          Clear
        </Button>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      id: "1",
      question: "John Brown",
      pressCount: 32,
      actions: "1",
    },
    {
      key: "2",
      id: "2",
      question: "John Brown",
      pressCount: 32,
      actions: "2",
    },
    {
      key: "3",
      id: "3",
      question: "John Brown",
      pressCount: 32,
      actions: "3",
    },
  ];

  return (
    <div style={{ padding: 100 }}>
      <Title level={3}>HR Event</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button
        style={{ marginLeft: "auto", marginTop: 10, display: "block" }}
        type="primary"
        icon={<ClearOutlined />}
        size={30}
      >
        Clear all
      </Button>
    </div>
  );
}

export default App;
