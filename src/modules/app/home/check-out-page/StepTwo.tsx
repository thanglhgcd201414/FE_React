import { Card, Radio } from 'antd';
import { motion } from 'framer-motion';
import { EPaymentMethod } from '../../../../constants/order-status';
import { CreditCardOutlined } from '@ant-design/icons';

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
                value={EPaymentMethod.PAYPAL}
                className="w-full p-4 border rounded-lg"
                checked={true}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                    alt="PayPal"
                    className="w-8 h-8"
                  />
                  <div>
                    <h4 className="font-semibold">
                      PayPal
                    </h4>
                    <p className="text-gray-500">Thanh toán an toàn qua PayPal</p>
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
