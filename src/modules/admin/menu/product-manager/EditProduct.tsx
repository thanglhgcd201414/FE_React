import * as React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { DEFINE_ROUTERS_ADMIN } from '../../../../constants/route-mapper';
import { Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IProduct } from '../../../../types/product.types';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import { productService } from '../../../../services';
import CreateOrEditProduct from './common/CreateOrEditProduct';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false);
  const [productDetail, setProductDetail] = React.useState<IProduct>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      handleGetProductDetail();
    }
  }, [id]);

  if (!id) {
    return <Navigate to={DEFINE_ROUTERS_ADMIN.productManager} />;
  }

  const handleGetProductDetail = async () => {
    try {
      setLoading(true);
      const rs = await productService.findOne(id);
      setProductDetail(rs.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const rs = await productService.update(id, data);
      message.success(rs.message);
      navigate(-1);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="min-w-[220px]"
        icon={<ArrowLeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        Trở lại
      </Button>
      {productDetail && (
        <CreateOrEditProduct item={productDetail} handleSubmit={handleSubmit} />
      )}
      <GeneralLoading isLoading={loading} />
    </>
  );
}
