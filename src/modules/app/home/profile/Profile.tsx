import {
  Button,
  Form,
  Input,
  message,
  Card,
  Row,
  Col,
  Flex,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useState, useEffect } from 'react';
import { IUser } from '../../../../types/user.types';
import { profileService } from '../../../../services';
import { setUser } from '../../../../lib/reducer/userSlice';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
  const [form] = useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await profileService.getProfile();
      setUserData(response.data);
      form.setFieldsValue(response.data);
      setAvatarUrl(response.data.avatar);
    } catch (error) {
      message.error('Lấy thông tin thất bại');
    }
  };

  const handleSave = async (values: Partial<IUser>) => {
    try {
      setLoading(true);
      const updatedUser = await profileService.updateProfile({
        ...values,
        avatar: avatarUrl,
      });
      setUserData(updatedUser.data);
      dispatch(setUser(updatedUser.data));
      setEditMode(false);
      message.success('Cập nhật hồ sơ thành công');
    } catch (error) {
      message.error('Cập nhật hồ sơ thất bại');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card
        title={
          <Flex align="center" gap={8}>
            <UserOutlined className="text-blue-600" />
            <span className="text-xl font-semibold">Hồ Sơ Cá Nhân</span>
          </Flex>
        }
        extra={
          !editMode && (
            <Button
              type="primary"
              onClick={() => setEditMode(true)}
              icon={<EditOutlined />}
              className="flex items-center"
            >
              Chỉnh sửa
            </Button>
          )
        }
        styles={{ header: { borderBottom: '2px solid #f0f0f0' } }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={userData || {}}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<span className="font-medium">Họ và Tên</span>}
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  disabled={!editMode}
                  className="h-10"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<span className="font-medium">Email</span>}
                name="email"
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  disabled
                  className="h-10"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<span className="font-medium">Số điện thoại</span>}
                name="phoneNumber"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  disabled={!editMode}
                  className="h-10"
                />
              </Form.Item>
            </Col>

            {/* Phần địa chỉ giao hàng đã được loại bỏ theo yêu cầu */}

            {editMode && (
              <Col span={24} className="mt-6">
                <Flex justify="end" gap={8}>
                  <Button
                    onClick={() => setEditMode(false)}
                    className="h-10 px-6"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="h-10 px-6"
                  >
                    Lưu thay đổi
                  </Button>
                </Flex>
              </Col>
            )}
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
