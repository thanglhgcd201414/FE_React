import { Typography, Row, Col, Card } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  TeamOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  PhoneOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="container mx-auto px-4 py-16"
      >
        {/* Header Section */}
        <motion.div variants={fadeIn} className="text-center mb-16">
          <Title className="text-4xl font-semibold mb-6 text-gray-800">
            Về Chúng Tôi
          </Title>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-24 bg-blue-400 rounded-full" />
          </div>
        </motion.div>

        {/* Mission Section */}
        <Row gutter={[32, 32]} className="mb-16" align="stretch">
          {/* First Card: Our Vision */}
          <Col xs={24} md={12} className="flex">
            <motion.div variants={fadeIn} className="w-full flex">
              <Card className="bg-green-50 border-0 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full w-full">
                <Title
                  level={3}
                  className="text-2xl font-semibold mb-4 flex items-center"
                >
                  <EyeOutlined className="text-green-500 mr-3 text-xl" />
                  Tầm Nhìn Của Chúng Tôi
                </Title>
                <Paragraph className="text-gray-600 leading-relaxed flex-1">
                  Mục tiêu của chúng tôi là cung cấp những chiếc điện thoại
                  thông minh, hiện đại với công nghệ tiên tiến nhất, giúp khách
                  hàng trải nghiệm cuộc sống thông minh hơn. Chúng tôi luôn nỗ
                  lực mang đến các sản phẩm điện thoại chính hãng, đa dạng về
                  mẫu mã và đáp ứng nhu cầu của người tiêu dùng.
                </Paragraph>
              </Card>
            </motion.div>
          </Col>

          {/* Second Card: Our Values */}
          <Col xs={24} md={12} className="flex">
            <motion.div variants={fadeIn} className="w-full flex">
              <Card className="bg-orange-50 border-0 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full w-full">
                <Title
                  level={3}
                  className="text-2xl font-semibold mb-4 flex items-center"
                >
                  <StarOutlined className="text-orange-500 mr-3 text-xl" />
                  Giá Trị Cốt Lõi Của Chúng Tôi
                </Title>
                <Paragraph className="text-gray-600 leading-relaxed flex-1">
                  Chúng tôi cam kết cung cấp các sản phẩm điện thoại có chất
                  lượng tốt, dịch vụ hậu mãi xuất sắc và giá trị bền vững. Sự
                  hài lòng của khách hàng luôn là ưu tiên hàng đầu, với những
                  sản phẩm công nghệ tiên tiến và chất lượng đỉnh cao.
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Stats Section */}
        <motion.div variants={fadeIn} className="mb-16">
          <Row gutter={[24, 24]} className="text-center">
            {[
              { icon: <TrophyOutlined />, title: 'Giải Thưởng', value: '10+' },
              {
                icon: <SafetyCertificateOutlined />,
                title: 'Sản Phẩm',
                value: '3000+',
              },
              { icon: <TeamOutlined />, title: 'Nhân Viên', value: '100+' },
              {
                icon: <PhoneOutlined />,
                title: 'Điện Thoại Bán Ra',
                value: '1M+',
              },
            ].map((item, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div className="p-4 bg-white border rounded-lg hover:border-blue-200 transition-all">
                  <div className="text-blue-500 text-2xl mb-3">{item.icon}</div>
                  <Title
                    level={4}
                    className="text-xl font-medium mb-1 text-gray-800"
                  >
                    {item.value}
                  </Title>
                  <Paragraph className="text-gray-600 text-sm">
                    {item.title}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={fadeIn} className="mb-16">
          <Title
            level={3}
            className="text-2xl font-semibold text-center mb-8 text-gray-800"
          >
            Đội Ngũ Tạo Nên Sự Khác Biệt
          </Title>
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4].map((item) => (
              <Col xs={24} sm={12} md={6} key={item}>
                <motion.div whileHover={{ y: -5 }} className="group relative">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src={`https://source.unsplash.com/random/400x400?person=${item}`}
                      alt="Team member"
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          Thành Viên {item}
                        </h4>
                        <p className="text-blue-100 text-sm">
                          Chuyên gia công nghệ
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeIn} className="text-center">
          <Title level={4} className="text-lg font-medium mb-6 text-gray-700">
            Kết nối với chúng tôi
          </Title>
          <div className="flex justify-center space-x-6">
            {[
              { icon: <FacebookOutlined />, color: 'blue-600' },
              { icon: <InstagramOutlined />, color: 'pink-500' },
              { icon: <TwitterOutlined />, color: 'sky-500' },
              { icon: <YoutubeOutlined />, color: 'red-600' },
            ].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className={`text-2xl text-gray-600 hover:text-${item.color} transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
