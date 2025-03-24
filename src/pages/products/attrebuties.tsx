import {
  Card,
  Col,
  Form,
  Radio,
  Row,
  Switch,
  Typography,
} from "antd";
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
      title={<Typography.Text> Attrebuties</Typography.Text>}
      bordered={false}
    >
      {selectCategoryInJson.attributes.map((attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                initialValue={attribute.defaultValue}
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <Radio.Group>
                  {attribute.availableOptions.map((option) => {
                    return (
                      <Radio.Button key={option} value={option}>
                        {option}{" "}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            ) : attribute.widgetType === "switch" ? (
              <Row>
                <Col>
                <Form.Item name={["attributes", attribute.name]} label={attribute.name} initialValue={attribute.defaultValue} valuePropName="checked">
                  <Switch checkedChildren="YES" unCheckedChildren="NO"></Switch>
                </Form.Item>
                </Col>
              </Row>
            ) : null}
          </div>
        );
      })}
    </Card>
  );
}
