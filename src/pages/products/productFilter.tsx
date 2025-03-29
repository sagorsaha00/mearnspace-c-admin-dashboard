import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { GetAllCatagories, getAlltanentsdata } from "../../http/api";
import { Category, ResturantType } from "../../types";
import { useAuthStore } from "../../store";
type productFileterfunction = {
  children?: React.ReactNode;
};

export default function ProductFilter({ children }: productFileterfunction) {
  const { data: tenants } = useQuery({
    queryKey: ["resturants"],
    queryFn: async () => {
      return getAlltanentsdata("");
    },
  });

  const { data: catagories } = useQuery({
    queryKey: ["catagories "],
    queryFn: async () => {
      return GetAllCatagories();
    },
  });

  const { user } = useAuthStore();
  return (
    <div>
      {" "}
      <Card>
        <Row align="middle" style={{ justifyContent: "space-between" }}>
          <Col span={15} style={{ margin: "10px" }}>
            <Row>
              <Col span={5} style={{ marginRight: "20px" }}>
                <Form.Item name="q">
                  <Input.Search placeholder="username" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
                {" "}
                <Form.Item name="CategoryId">
                  <Select
                    id="CategoryId"
                    style={{ width: "80%", marginLeft: "10px" }}
                    placeholder="Catagories"
                    allowClear={true}
                  >
                    {catagories?.data?.categories?.map(
                      (item: ResturantType) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>{" "}
              </Col>
              <Col span={5} style={{ marginRight: "20px" }}>
                {user!.role === "admin" && (
                  <Form.Item name="tenantId">
                    <Select
                      id="tenantid"
                      style={{ width: "80%", marginLeft: "10px" }}
                      placeholder="Restaurant"
                      allowClear={true}
                      onChange={(value) => {
                        console.log("Selected Category ID:", value); // Logs the selected category id
                      }}
                    >
                      {tenants?.data.data.map((item: Category) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </Col>
              <Col span={5} style={{ marginRight: "20px" }}>
                <Space>
                  <Form.Item name="isPublish">
                    <Switch
                      defaultValue={false}
                      defaultChecked
                      onChange={() => {}}
                    />
                  </Form.Item>
                  <Typography.Text>show only publish</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col span={3}>{children}</Col>
        </Row>
      </Card>
    </div>
  );
}
