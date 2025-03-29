import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import { Category, testCategory } from "../../types";
import { getCategoryId } from "../../http/api";
import { useQuery } from "@tanstack/react-query";

interface AttrebutiesProps {
  selectCategory: Category;
}

export default function Price({ selectCategory }: AttrebutiesProps) {
  const seleCategoryId = selectCategory.toString();
  

  const { data: FetchCategories } = useQuery<testCategory>({
    queryKey: ["FetchCategories", selectCategory],

    queryFn: async () => getCategoryId(seleCategoryId).then((res) => res.data),
    enabled: !!selectCategory,
    staleTime: 1000 * 60 * 5,
  });

  if (!FetchCategories) {
    return null;
  }
  

  return (
    <Card
      title={<Typography.Text> Attrebuties</Typography.Text>}
      bordered={false}
    >
      {FetchCategories.category.attributes.map((attribute) => {
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
                  <Form.Item
                    name={["attributes", attribute.name]}
                    label={attribute.name}
                    initialValue={attribute.defaultValue}
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="YES"
                      unCheckedChildren="NO"
                    ></Switch>
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
