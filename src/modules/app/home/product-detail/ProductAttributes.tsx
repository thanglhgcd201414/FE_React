import { Table } from 'antd';
import { IVariants } from '../../../../types/product.types';
import Column from 'antd/es/table/Column';

interface IProps {
  variant?: IVariants | null;
}

export default function ProductAttributes({ variant }: IProps) {
  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={variant?.specifications}
        pagination={false}
        rowKey={(record) => record.key}
      >
        <Column title="Thông Số" dataIndex="key" key="key" />
        <Column title="Giá Trị" dataIndex="value" key="value" />
      </Table>
    </div>
  );
}
