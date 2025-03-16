import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Flex, Form, Space } from 'antd'
import React from 'react'
import ProductFilter from './productFilter';
import { useForm } from 'antd/es/form/Form';

export default function Products() {
    const [form] = useForm();
  return (
 <>
   <Space direction="vertical" style={{ width: "100%" }}>
        {" "}
        <Flex style={{ justifyContent: "space-between" }}>
          <Breadcrumb
            separator={<RightOutlined style={{ fontSize: "16px" }} />}
            items={[{ title: "Dashboard" }, { title: "User" }]}
          ></Breadcrumb>
           
      

         
        </Flex>
       
          <Form form={form}>
            <ProductFilter>
              {" "}
              <Button
                icon={<PlusOutlined />}
                onClick={() => {}}
                type="primary"
                style={{ justifyContent: "flex-end" }}
              >
                Add user
              </Button>
            </ProductFilter>
          </Form>
           </Space>
 </>
  )
}
