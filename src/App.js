import { ClearOutlined } from "@ant-design/icons";
import { Button, Space, Spin, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
const { Title, Text } = Typography;
function App() {
  const apiUrl = "https://hr-event-osd.herokuapp.com";
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Pain Points",
      dataIndex: "paintPoint",
      key: "paintPoint",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Press Count",
      dataIndex: "pressCount",
      key: "pressCount",
      render: (text) => <Text strong>{text}</Text>,
    },

    {
      title: "Action",
      key: "actions",
      dataIndex: "actions",
      render: (id) => (
        <Button
          onClick={() => onReset(id)}
          type="primary"
          icon={<ClearOutlined />}
          size={30}
        >
          Clear
        </Button>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  /*
   */

  const onReset = async (question_id) => {
    try {
      await axios.delete(apiUrl + "/reset-count-by-id", {
        params: {
          question_id,
        },
      });

      fetchCount();
    } catch (error) {
      console.log({ error });
    }
  };

  const onResetAll = async () => {
    try {
      await axios.delete(apiUrl + "/reset-all");
      fetchCount();
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchCount = async () => {
    try {
      const response = await Promise.all(
        [...Array(6)].map((_, index) =>
          axios.get(apiUrl + "/count", {
            params: {
              question_id: index + 1,
            },
          })
        )
      );
      setData(response.map((item) => item.data));
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <Space direction="vertical" style={{ padding: 100, width: "100%" }}>
      <Title level={3}>HR Event</Title>
      {isLoading ? (
        <Spin
          size="large"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <>
          <Table columns={columns} dataSource={data} pagination={false} />
          <Button
            style={{ marginLeft: "auto", marginTop: 10, display: "block" }}
            type="primary"
            icon={<ClearOutlined />}
            onClick={onResetAll}
          >
            Clear all
          </Button>
        </>
      )}
    </Space>
  );
}

export default App;
