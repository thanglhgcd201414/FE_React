import { Card, Input, Select } from 'antd';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';

interface IProps {
  formData: any;
  setFormData: (value: any) => void;
}

export default function StepOne({formData, setFormData}: IProps) {
  const { userData } = useSelector((state: IRootState) => state.user);

  return (
    <motion.div
      key="step1"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <Card title="Thông tin giao hàng">
        <div className="space-y-4">
          <div className="ant-form-item">
            <label>Họ và tên</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!!userData?.name}
            />
          </div>

          <div className="ant-form-item">
            <label>Số điện thoại</label>
            <Input
              value={formData.phoneNumber}
              placeholder="Nhập số điện thoại"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              disabled={!!userData?.phoneNumber}
            />
          </div>

          {userData?.shippingAddress?.length ? (
            <div className="ant-form-item flex flex-col gap-2 items-start">
              <label>Địa chỉ:</label>
              <Select
                className='w-full'
                value={formData.address}
                onChange={(value) => {
                  const [street, district, city] = value.split(', ');
                  setFormData({
                    ...formData,
                    address: value,
                    city,
                    district,
                    street,
                  });
                }}
                options={userData.shippingAddress.map((addr, index) => ({
                  value: `${addr.street}, ${addr.district}, ${addr.city}`,
                  label: `${addr.street}, ${addr.district}, ${addr.city}`,
                }))}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="ant-form-item">
                <label>Tỉnh/Thành phố</label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div className="ant-form-item">
                <label>Quận/Huyện</label>
                <Input
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      district: e.target.value,
                    })
                  }
                />
              </div>
              <div className="ant-form-item">
                <label>Phường/Xã</label>
                <Input
                  value={formData.ward}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ward: e.target.value,
                    })
                  }
                />
              </div>
              <div className="ant-form-item">
                <label>Tên đường</label>
                <Input
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      street: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="ant-form-item">
            <label>Ghi chú</label>
            <Input.TextArea
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
