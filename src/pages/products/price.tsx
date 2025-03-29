import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd";
import { Category, testCategory } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getCategoryId } from "../../http/api";

interface AttrebutiesProps {
  selectCategory: testCategory;
}

export default function Price({ selectCategory }: AttrebutiesProps) {
  const seleCategoryId = selectCategory.toString();

  const [form] = Form.useForm();

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
    <Form
      form={form}
      initialValues={{
        priceConfiguration: selectCategory.priceConfiguration,
      }}
    >
      <Card
        id="priceConfiguration"
        title={<Typography.Text>Product Price</Typography.Text>}
        bordered={false}
      >
        {FetchCategories?.category?.priceConfiguration &&
        Object.entries(FetchCategories.category.priceConfiguration).length >
          0 ? (
          Object.entries(FetchCategories.category.priceConfiguration).map(
            ([configertionKey, configertionValue]) => (
              <div key={configertionKey}>
                <Space size="large" style={{ width: "100%" }}>
                  <Typography.Text>
                    {`${configertionKey}: ${
                      configertionValue?.priceType || ""
                    }`}
                  </Typography.Text>
                  <Row gutter={20}>
                    {configertionValue?.availableOptions?.map(
                      (option: string) => (
                        <Col span={8} key={option}>
                          <Form.Item
                            label={option}
                            name={[
                              "priceConfiguration",
                              configertionKey,
                              option,
                            ]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a value",
                              },
                            ]}
                          >
                            <InputNumber min={0} style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                      )
                    )}
                  </Row>
                </Space>
              </div>
            )
          )
        ) : (
          <Typography.Text>No price configuration available</Typography.Text>
        )}
      </Card>
    </Form>
  );
}
