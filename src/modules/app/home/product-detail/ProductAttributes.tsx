import { Table } from 'antd';
import Column from 'antd/es/table/Column';

interface IProps {
  specifications?: Array<{key: string, value: string}> | null;
}

export default function ProductAttributes({ specifications }: IProps) {
  if (!specifications || specifications.length === 0) {
    return <div className="text-gray-500">Không có thông số kỹ thuật</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={specifications}
        pagination={false}
        rowKey={(record) => record.key}
      >
        <Column title="Thông Số" dataIndex="key" key="key" />
        <Column title="Giá Trị" dataIndex="value" key="value" />
      </Table>
    </div>
  );
}
