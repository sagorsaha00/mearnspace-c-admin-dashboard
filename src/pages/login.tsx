import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../../src/components/icons/logo";
export default function LoginPage() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space
        direction="vertical"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Layout.Content>
          <Logo />
        </Layout.Content>
        <Card
          bordered={false}
          title={
            <Space
              style={{
                display: "flex",
                fontSize: 18,
                justifyContent: "center",
                width: 300,
                textAlign: "center",
              }}
            >
              <LockFilled />

              <span>sign up</span>
            </Space>
          }
        >
          <Form initialValues={{ remberme: true }}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "please input your username",
                },
                {
                  type: "email",
                  message: "please input valid email",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
              />
            </Form.Item>
            <Flex style={{ justifyContent: "space-between", display: "flex" }}>
              <Form.Item
                name="remberme"
                valuePropName="checked"
                style={{ marginLeft: 4 }}
              >
                <Checkbox>Rember me</Checkbox>
              </Form.Item>
              <a
                href=""
               
                style={{ paddingTop: 4, marginRight: 20 }}
              >
                Forget Password
              </a>
            </Flex>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
}
