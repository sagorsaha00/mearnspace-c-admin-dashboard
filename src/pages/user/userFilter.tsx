import { Card, Col, Input, Row, Select } from "antd";

type userFileterfunction = {
  children?: React.ReactNode;
  onFilterChnage: (filterName: string, filterValue: string) => void;
};

export default function UserFilter({
  onFilterChnage,
  children,
}: userFileterfunction) {
  return (
    <Card>
      <Row align="middle" style={{ justifyContent: "space-between" }}>
        <Col span={15} style={{ margin: "10px" }}>
          <Row>
            <Col span={8} style={{ marginRight: "20px" }}>
              <Input.Search
                placeholder="username"
                allowClear={true}
                onChange={(e) =>
                  onFilterChnage("serchFilterValue", e.target.value)
                }
              />
            </Col>
            <Col span={7}>
              {" "}
              <Select
                style={{ width: "80%", marginLeft: "10px" }}
                placeholder="Role"
                allowClear={true}
                onChange={(selectItem) =>
                  onFilterChnage("roleFilterValue", selectItem)
                }
              >
                <Select.Option value="admin">Admin </Select.Option>
                <Select.Option value="manager">manager </Select.Option>
                <Select.Option value="customer">Admin </Select.Option>
              </Select>{" "}
            </Col>
            <Col span={7} style={{ marginRight: "30px" }}>
              <Select
                style={{ width: "80%" }}
                allowClear={true}
                placeholder="Status"
                onChange={(selectItem) =>
                  onFilterChnage("statusFilterValue", selectItem)
                }
              >
                <Select.Option value="Ban">Ban </Select.Option>
                <Select.Option value="Active">Active </Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={3}>{children}</Col>
      </Row>
    </Card>
  );
}
