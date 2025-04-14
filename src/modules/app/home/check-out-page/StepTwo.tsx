import { Card, Radio } from 'antd';
import { motion } from 'framer-motion';
import { EPaymentMethod } from '../../../../constants/order-status';
import {
  CreditCardOutlined,
  TruckOutlined,
  WalletOutlined,
} from '@ant-design/icons';

interface IProps {
  paymentMethod: EPaymentMethod;
  setPaymentMethod: (value: EPaymentMethod) => void;
}

export default function StepTwo({ paymentMethod, setPaymentMethod }: IProps) {
  return (
    <motion.div
      key="step2"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <Card
        title="Phương thức thanh toán"
        className="shadow-lg"
        extra={<CreditCardOutlined className="text-blue-600" />}
      >
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="w-full"
        >
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Radio
                value={EPaymentMethod.CAST}
                className="w-full p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <TruckOutlined className="text-2xl text-green-600" />
                  <div>
                    <h4 className="font-semibold">
                      Thanh toán khi nhận hàng (COD)
                    </h4>
                    <p className="text-gray-500">Phí xử lý: 0đ</p>
                  </div>
                </div>
              </Radio>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Radio
                value={EPaymentMethod.BANK_TRANSFER}
                className="w-full p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <WalletOutlined className="text-2xl text-orange-600" />
                  <div>
                    <h4 className="font-semibold">Ví điện tử</h4>
                    <p className="text-gray-500">VNPay</p>
                  </div>
                </div>
              </Radio>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Radio
                value="credit"
                className="w-full p-4 border rounded-lg"
                disabled
              >
                <div className="flex items-center gap-4">
                  <CreditCardOutlined className="text-2xl text-purple-600" />
                  <div>
                    <h4 className="font-semibold">
                      Thẻ tín dụng/ghi nợ (Hiện chưa hỗ trợ chức năng này)
                    </h4>
                    <p className="text-gray-500">Hỗ trợ Visa, MasterCard</p>
                  </div>
                </div>
              </Radio>
            </motion.div>
          </div>
        </Radio.Group>
      </Card>
    </motion.div>
  );
}
