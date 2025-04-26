import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Avatar,
  Card,
  Row,
  Col,
  Divider,
  Flex,
  Empty,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useState, useEffect } from 'react';
import { IUser } from '../../../../types/user.types';
import { profileService, uploadService } from '../../../../services';
import buildImageUrl from '../../../../utils/build-image-url';
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

  const handleUpload = async (options: any) => {
    if (userData?.avatar) {
      await uploadService.deleteImages([userData.avatar]);
    }
    const { file } = options;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await uploadService.uploadImage(formData);
      setAvatarUrl(response.data);
      message.success('Upload ảnh thành công!');
    } catch (error) {
      message.error('Upload ảnh thất bại!');
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
        headStyle={{ borderBottom: '2px solid #f0f0f0' }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={userData || {}}
        >
          <Row gutter={24}>
            <Col span={24} className="text-center mb-8">
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={handleUpload}
                disabled={!editMode}
              >
                <Avatar
                  src={buildImageUrl(avatarUrl ?? '')}
                  icon={<UserOutlined />}
                  size={120}
                  className="mb-4 border-2 border-gray-200 hover:border-blue-500 transition-all"
                  style={{ backgroundColor: '#f0f2f5' }}
                />
                {editMode && (
                  <div className="mt-2">
                    <Button
                      icon={<UploadOutlined />}
                      type="dashed"
                      className="text-blue-600"
                    >
                      Đổi ảnh đại diện
                    </Button>
                  </div>
                )}
              </Upload>
            </Col>

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

            <Col span={24}>
              <Divider orientation="left">
                <Flex align="center" gap={8}>
                  <EnvironmentOutlined className="text-green-600" />
                  <span className="text-gray-600 font-medium">
                    Địa chỉ giao hàng
                  </span>
                </Flex>
              </Divider>
{/* 
              {
                !userData?.shippingAddress.length && <Empty description="Không có dữ liệu"/>
              } */}

              <Form.List name="shippingAddress">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="p-4 border rounded-lg hover:border-blue-200 transition-colors"
                      >
                        <Row gutter={16} align="middle">
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              label="Thành Phố"
                              name={[name, 'city']}
                              rules={[{ required: true }]}
                            >
                              <Input disabled={!editMode} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              label="Quận/Huyện"
                              name={[name, 'district']}
                              rules={[{ required: true }]}
                            >
                              <Input disabled={!editMode} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              label="Phường/Xã"
                              name={[name, 'ward']}
                              rules={[{ required: true }]}
                            >
                              <Input disabled={!editMode} />
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item
                              {...restField}
                              label="Đường/Phố"
                              name={[name, 'street']}
                              rules={[{ required: true }]}
                            >
                              <Input disabled={!editMode} />
                            </Form.Item>
                          </Col>
                          {editMode && (
                            <Col span={1}>
                              <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}
                                className="text-red-500 hover:text-red-600"
                              />
                            </Col>
                          )}
                        </Row>
                      </div>
                    ))}
                    {editMode && (
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<EnvironmentOutlined />}
                        className="mt-4 h-10 text-blue-600"
                      >
                        Thêm địa chỉ mới
                      </Button>
                    )}
                  </div>
                )}
              </Form.List>
            </Col>

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
