import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd";
import { Category } from "../../types";

interface AttrebutiesProps {
  selectCategory: Category;
}

export default function Price({ selectCategory }: AttrebutiesProps) {
  const selectCategoryInJson: Category | null = selectCategory
    ? JSON.parse(selectCategory as unknown as string)
    : null;
  if (!selectCategoryInJson) {
    return null;
  }
  
  return (
    <Card
      title={<Typography.Text> Product Price</Typography.Text>}
      bordered={false}
    >
      {Object.entries(selectCategoryInJson.priceConfiguration).map(
        ([configertionKey, configertionValue]) => (
          <div key={configertionKey}>
            {" "}
            <Space size={"large"} style={{ width: "100%" }}>
              <Typography.Text>
                {" "}
                {`${configertionKey}: ${configertionValue.priceType}`}{" "}
              </Typography.Text>
              <Row gutter={20}>
                {configertionValue.availableOptions.map((option: string) => (
                  <Col span={8} key={option}>
                    <Form.Item
                      label={option}
                      name={[
                        "priceConfiguration",
                        configertionKey, // Directly use the key
                        option, // Option name as a nested key
                      ]}
                      rules={[
                        { required: true, message: "Please enter a value" },
                      ]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              ;
            </Space>
          </div>
        )
      )}
    </Card>
  );
}
