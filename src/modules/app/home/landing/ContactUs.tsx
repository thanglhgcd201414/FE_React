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

        <Row gutter={[48, 32]} className="items-start justify-start">
          {/* Contact Information */}
          <Col xs={24} md={12}>
            <motion.div variants={fadeIn}>
              <Card className="shadow-lg border-0">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <EnvironmentOutlined className="text-2xl text-blue-500 mt-1" />
                    <div>
                      <Text strong className="text-lg">Office Address</Text>
                      <p className="text-gray-600">123 Trần Hưng Đạo<br/>Hoàn Kiếm, Hà Nội</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MailOutlined className="text-2xl text-blue-500 mt-1" />
                    <div>
                      <Text strong className="text-lg">Email Us</Text>
                      <p className="text-gray-600">support@company.vn<br/>sales@company.vn</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <PhoneOutlined className="text-2xl text-blue-500 mt-1" />
                    <div>
                      <Text strong className="text-lg">Call Us</Text>
                      <p className="text-gray-600">+84 24 1234 5678<br/>+84 912 345 678</p>
                    </div>
                  </div>

                  <div className="flex space-x-6 pt-6">
                    <FacebookFilled className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700 transition" />
                    <TwitterCircleFilled className="text-2xl text-blue-400 cursor-pointer hover:text-blue-500 transition" />
                    <InstagramFilled className="text-2xl text-pink-500 cursor-pointer hover:text-pink-600 transition" />
                    <LinkedinFilled className="text-2xl text-blue-700 cursor-pointer hover:text-blue-800 transition" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} md={12}>
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

        {/* Map Section */}
        <motion.div variants={fadeIn} className="mt-16">
          <iframe
            title="hanoi-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097806855251!2d105.85421431540294!3d21.02849368599819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abeb8b2f3ed3%3A0x4b1b568a67e9e94b!2zSMOgIE3hu7kgxJDDrG5oLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1659085672319!5m2!1svi!2s"
            width="100%"
            height="400"
            className="rounded-lg shadow-xl border-0"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </div>
  );
}