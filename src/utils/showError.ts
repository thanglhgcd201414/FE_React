import { message } from "antd";

export default function showError(data: Record<string, any>) {
  message.error(data.message);
}
