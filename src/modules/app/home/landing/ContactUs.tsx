import { Form, Input, Button, Typography, Row, Col, Card } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  LinkedinFilled
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export default function ContactUs() {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Thực hiện gửi thông tin ở đây
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen w-full p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="container mx-auto"
      >
        <Title
          level={2}
          className="text-center mb-12 text-4xl font-bold text-gray-800"
        >
          Liên hệ với chúng tôi
          <div className="h-1 w-20 bg-blue-500 mt-4 mx-auto" />
        </Title>

        <Row gutter={[48, 32]} className="items-center justify-center">


          {/* Contact Form */}
          <Col xs={24} md={24}>
            <motion.div variants={fadeIn}>
              <Form
                name="contact"
                onFinish={onFinish}
                className="shadow-lg p-8 rounded-lg bg-white"
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                >
                  <Input
                    placeholder="Họ và tên"
                    prefix={<MailOutlined className="text-gray-400" />}
                    className="h-12 rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    prefix={<MailOutlined className="text-gray-400" />}
                    className="h-12 rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input
                    placeholder="Số điện thoại"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    className="h-12 rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Nội dung"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-12 rounded-lg flex items-center justify-center text-lg"
                    icon={<SendOutlined className="text-xl" />}
                  >
                    Gửi tin nhắn
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>
          </Col>
        </Row>


      </motion.div>
    </div>
  );
}