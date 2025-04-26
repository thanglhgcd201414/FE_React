import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd";

interface PayPalPaymentProps {
  amount: number;
  onSuccess: (details: any) => void;
}

const PayPalPayment = ({ amount, onSuccess }: PayPalPaymentProps) => {
  console.log("PayPal Payment Amount:", amount);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AcyquzZD-iPBdYO8wMDwKNff3-fZwwbv2aNPqYXVEYvz310DAjkciGyxBfkzJ4rwC9zKnD-o41vPx1MO",
        currency: "USD",
        components: "buttons",
        intent: "capture"
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay"
        }}
        forceReRender={[amount]}
        fundingSource={undefined}
        createOrder={(_data, actions) => {
          // Đảm bảo amount là số dương và được định dạng đúng
          const amountValue = Math.max(0.01, amount).toFixed(2);
          console.log("Creating PayPal order with amount:", amountValue);

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amountValue,
                  currency_code: "USD",
                },
                description: "Đơn hàng từ WinMobile",
              },
            ],
          });
        }}
        onApprove={async (_data, actions) => {
          if (actions.order) {
            try {
              const details = await actions.order.capture();
              console.log("PayPal capture successful:", details);

              // Kiểm tra xem details có chứa thông tin cần thiết không
              if (!details.id) {
                console.error("PayPal capture missing transaction ID");
                message.error("Thanh toán PayPal thiếu thông tin giao dịch");
                return;
              }

              onSuccess(details);
            } catch (error) {
              console.error("PayPal Capture Error:", error);
              message.error("Có lỗi xảy ra trong quá trình thanh toán PayPal");
            }
          }
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          message.error("Có lỗi xảy ra trong quá trình thanh toán PayPal: " + (err.message || "Unknown error"));
        }}
        onCancel={() => {
          console.log("PayPal payment cancelled");
          message.info("Bạn đã hủy thanh toán PayPal");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
